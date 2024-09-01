import NextAuth, { AuthOptions, User as NextAuthUser } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/db';

// Extend the User type to include only the fields that exist in your Prisma schema
interface UserWithUsername extends NextAuthUser {
  username: string;
  // Only include fields that exist in your Prisma schema here
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const userWithUsername = user as UserWithUsername;

      // Generate a username if it doesn't exist
      if (!userWithUsername.username) {
        userWithUsername.username = userWithUsername.email?.split('@')[0] || userWithUsername.name || 'user';
      }

      // Explicitly remove any fields that should not be passed to Prisma
      delete (userWithUsername as any).image;
      delete (userWithUsername as any).emailVerified; // Remove emailVerified field

      // Return true to continue the sign-in process
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string; // Assign username from token
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const userWithUsername = user as UserWithUsername;
        token.id = userWithUsername.id;
        token.username = userWithUsername.username; // Store username in the token
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
