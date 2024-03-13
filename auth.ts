import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { compareSync } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToMongoDB } from './lib/database/mongodb';
import User from './models/User';

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
        try {
          await connectToMongoDB();

          const user = await User.findOne({
            email: credentials?.email,
          }).lean();

          if (!user?.password) return null;

          if (!compareSync(credentials.password as string, user.password))
            return null;

          return user;
        } catch (error) {
          console.log('Error fetching user from MongoDB', error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Ako se prijavljujemo s Google-om ili Githubom, moramo napraviti racun i u nasoj bazi ako vec ne postoji
      // Ako se prijavljujemo s credentials, tu ne radi nista, samo return true

      if (account?.provider === 'credentials') return true;

      try {
        await connectToMongoDB();

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) return true;

        const newUser = new User({
          fullName: user.name || '',
          email: user.email || '',
          avatarUrl: user.image || '',
        });

        await newUser.save();

        return true;
      } catch (error) {
        console.log('Error with sign in with provider', error);
        return false;
      }

      // Provjeri jel postoji korisnicki racun s tim mailom
      // Ako postoji, return true, sve svima
      // Ako ne postoji, kreiraj ga, i returnaj true ako sve stima,
      // Ako dodje do errora, ofc, return false
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  pages: {
    signIn: '/login',
  },
});
