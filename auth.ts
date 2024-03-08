import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { compareSync } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToMongoDB } from './lib/database/mongodb';
import User, { type IUser } from './models/User';
import { loginFormSchema } from './lib/zod/user-schema';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';  implement later
// import clientPromise from './lib/database/mongoClientPromise';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email address',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validateCredentials = loginFormSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (!validateCredentials.success) {
          throw new Error(
            'Invalid email or password!',
            validateCredentials.error
          );
        }

        let user: IUser | null = null;

        try {
          await connectToMongoDB();

          user = await User.findOne({
            email: credentials?.email,
          });

          // console.log('user u authorize', user);
          if (!user) {
            return null;
          }

          if (
            user.password &&
            compareSync(credentials.password as string, user.password)
          ) {
            return {
              ...user,
              id: user._id,
            };
          }

          // after user is fetch we compare the passwords with bycript compare
          // console.log('user from mongo', user);
        } catch (error) {
          console.log('Error fetching user from MongoDB', error);
        }

        // redirect to /signup/regiseter
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Ako se prijavljujemo s Google-om ili Githubom, moramo napraviti racun i u nasoj bazi ako vec ne postoji
      // Ako se prijavljujemo s credentials, tu ne radi nista, samo return true

      if (account?.provider !== 'credentials') {
        try {
          await connectToMongoDB();

          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) return true;

          const newUser = new User({
            fullName: user.name || '',
            email: user.email || '',
            avatarUrl: user.image || '',
          });

          const createdUser = await newUser.save();
          console.log('createdUser', createdUser);
        } catch (error) {
          console.log('Error with sign in with provider', error);
          throw error;
        }
      }

      // Provjeri jel postoji korisnicki racun s tim mailom
      // Ako postoji, return true, sve svima
      // Ako ne postoji, kreiraj ga, i returnaj true ako sve stima,
      // Ako dodje do errora, ofc, return false
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
});
