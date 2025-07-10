import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./utils/ValidationSchemes";
import { prisma } from "./utils/prisma";
import bcrypt from "bcryptjs";
 
// Notice this is only an object, not a full Auth.js instance
export default {
   providers: [
    Credentials({
      async authorize(data) {
        const validation = LoginSchema.safeParse(data);
        if (validation.success) {
          const { email, password } = validation.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.password) return null;

          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig