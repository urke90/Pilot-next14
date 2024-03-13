'use server';

import { genSalt, hash } from 'bcryptjs';
import User from '@/models/User';

import { connectToMongoDB } from '../database/mongodb';
import { signUpFormSchema } from '../zod/user-schema';
import { MongoError, MongoServerError } from 'mongodb';
import { MongooseError } from 'mongoose';

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
    await connectToMongoDB();

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return { ok: true, status: 201 };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'MongoError' && (error as MongoError).code === 11000)
        return { ok: false, status: 409 };
    }

    console.log('Error creating new user', error);
    return { ok: false, status: 500 };
  }
};
