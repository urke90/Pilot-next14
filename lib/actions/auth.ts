'use server';

import { signIn, signOut } from '@/auth';

export const signInGoogle = async () => {
  return signIn('google');
};

export const signInGithub = async () => {
  return signIn('github');
};

export { signIn, signOut };
