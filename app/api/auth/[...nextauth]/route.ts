import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import User, { IUser } from '@/models/User';
import { connectToMongoDB } from '@/lib/database/mongodb';

// ----------------------------------------------------------------

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'signin',
      id: 'signin',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email address',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials);

        let user: IUser | null = null;

        try {
          await connectToMongoDB();

          // ? Should the password be encrypted when
          user = await User.findOne({
            email: credentials?.email,
            password: credentials?.password,
          });

          console.log('user from mongo', user);
        } catch (error) {
          console.log('Error fetching user from MongoDB', error);
        }

        // Have to check this as well since TS file for MongoDB says Document._id is optional ---> string | undefined
        if (user) {
          return {
            ...user,
            id: user._id,
          };
        }
        // redirect to /signup/regiseter
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log('params', params);
      return '';
    },
  },
  pages: {
    signIn: '/login',
    // signOut: string
    // error: string
    // verifyRequest: string
    // newUser: string
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
