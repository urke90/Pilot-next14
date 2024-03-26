import { compareSync } from 'bcryptjs';
import User from '@/models/User';
import { connectToMongoDB } from '../database/mongodb';
import { loginFormSchema } from '../zod/user-schema';

// ----------------------------------------------------------------

export const validateUserOnLogin = async (email: string, password: string) => {
  try {
    const validatedCredentials = loginFormSchema.safeParse({
      email,
      password,
    });
    if (!validatedCredentials.success) {
      console.log(
        'Errors validating email and password on server',
        validatedCredentials.error
      );
    }

    await connectToMongoDB();

    const user = await User.findOne({
      email,
    }).lean();

    if (!user?.password) return null;

    if (!compareSync(password as string, user.password)) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log('Error fetching user from MongoDB', error);
  }
};
