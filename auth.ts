import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import { createNewUser, getUserByEmail } from './lib/actions/user-actions';

// ----------------------------------------------------------------

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') return true;

      try {
        if (!user.email) return false;
        const existingUser = await getUserByEmail(user.email);

        if (existingUser) return true;

        await createNewUser({
          fullName: user.name ?? '',
          email: user.email,
          password: '',
        });

        return true;
      } catch (error) {
        console.log('Error with sign in with provider', error);
        return false;
      }
    },
    async jwt({ token }) {
      try {
        if (!token.email) return token;

        const userJWT = await getUserByEmail(token.email);
        if (userJWT) {
          token.id = userJWT._id.toString();
          token.onboardingStep = userJWT.onboardingStep;
        }

        return token;
      } catch (error) {
        console.log('Error inside jwt callback', error);
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.onboardingStep = token.onboardingStep;
      }

      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  pages: {
    signIn: '/login',
  },
  ...authConfig,
});
