import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./utils/prisma";
import authConfig from "./auth.config";

//  import GitHub from "next-auth/providers/github"
//  import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
if(session.user && token.sub) session.user.id= token.sub;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
