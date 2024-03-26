'use server';

import User from '@/models/User';
import { genSalt, hash } from 'bcryptjs';

import { MongoError } from 'mongodb';
import { connectToMongoDB } from '../database/mongodb';
import type { IUser } from '@/models/User';
import type { IUserOnboarding } from '../zod/onboarding-schema';

// ----------------------------------------------------------------

export const getUserById = async (userId: string) => {
  try {
    await connectToMongoDB();
    const user = await User.findById<IUser>(userId);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log('Error getting user from MongoDB', error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await connectToMongoDB();

    const user = await User.findOne<IUser>({ email });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log('Error getting user from MongoDB', error);
  }
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

export const updateUserOnboardingStep = async (
  id: string,
  data: Partial<IUserOnboarding>
) => {
  try {
    await connectToMongoDB();

    const user = await User.findOneAndUpdate<IUser>(
      { _id: id },
      { $set: data }
    ).lean();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log('error update User Onboarding State', error);
    console.log('error update User Onboarding State TYPEOF', typeof error);
    if (error instanceof Error) {
      console.log('error update User Onboarding State', error instanceof Error);
    }
    if (error instanceof MongoError) {
      console.log(
        'error update User Onboarding State TYPEOF',
        error instanceof MongoError
      );
    }
  }
};

export const updateUser = async (userId: string, data: IUserOnboarding) => {
  try {
    await connectToMongoDB();
    const bla = await User.findByIdAndUpdate({ _id: userId }, data, {
      new: true,
    });

    console.log(
      'BLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      bla
    );

    return { ok: true, status: 200 };
  } catch (error) {
    console.log('ERROR WHILE UPDATING ONBOARDING USER', error);
  }
};
