'use server';

import User from '@/models/User';
import { genSalt, hash } from 'bcryptjs';

import { EOnboardingStep } from '@/types/onboarding-step';
import { MongoError } from 'mongodb';
import { connectToMongoDB } from '../database/mongodb';
import { IUserOnboarding } from '../zod/onboarding-schema';

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

export const updateUserOnboardingStep = async (
  id: string,
  onboardingStep: EOnboardingStep
) => {
  try {
    await connectToMongoDB();

    const user = await User.findOneAndUpdate(
      { _id: id },
      { onboardingStep }
    ).lean();

    // console.log('user Updated', user);
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
    await User.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return { ok: true, status: 200 };
  } catch (error) {
    console.log('ERROR WHILE UPDATING ONBOARDING USER', error);
  }
};
