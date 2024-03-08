'use server';

import { genSalt, hash } from 'bcryptjs';
import User from '@/models/User';

import { connectToMongoDB } from '../database/mongodb';
import { signUpFormSchema } from '../zod/user-schema';

// ----------------------------------------------------------------

export const findUserByEmail = async (email: string) => {
  await connectToMongoDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User with provided email is not found!');
  }

  return user;
};

export const createNewUser = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const validatedSchema = signUpFormSchema.safeParse({
      fullName,
      email,
      password,
    });

    if (!validatedSchema.success) {
      // not suer how this works ???
      throw new Error('Validation failed occured!', validatedSchema.error);
    }

    await connectToMongoDB();

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // return newUser;
  } catch (error) {
    console.log('Error creating new user', error);
  }
};
