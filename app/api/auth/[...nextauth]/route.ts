import NextAuth, { User, type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

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
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email address',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // const user: User = {
        //   id: '1',
        //   name: 'J Smith',
        //   email: 'jsmith@example.com',
        //   image: '',
        // };
        return null;
        // return user;
        // return null;
      },
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log('params', params);
      return '';
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
