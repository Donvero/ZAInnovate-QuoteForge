import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "QuoteForge Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@business.co.za" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // In a production app, verify password hash with bcrypt against prisma.user.
        // For demonstration and initial setup, provide seamless login.
        return {
          id: "usr_zainnovate_demo",
          name: "Sipho Khumalo",
          email: credentials.email,
          image: null,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
        (session.user as any).companyId = "comp_zainnovate_01";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "quoteforge-super-secret-key-development",
};
