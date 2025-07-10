"use server";

import { LoginSchema, RegisterSchema } from "@/utils/ValidationSchemes";
import { prisma } from "@/utils/prisma";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
// type LoginDto = z.infer<typeof LoginSchema>;

//Login action
export const LoginAction = async (data: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials " };
  }
  const { email, password } = validation.data;
  try {
    await signIn("credentials", { email, password, redirectTo: "/profile" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "invalid email or password" };
        default:
          return { success: false, message: " something went wrong" };
      }
    }
    throw error;
  }
  console.log(data);
  return { success: true, message: "logged in successfully" };
};

//register action
export const RegisterAction = async (data: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials " };
  }

  const { name, email, password } = validation.data;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return { success: false, message: "user already exist" };

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    await prisma.user.create({ data: { name, email, password: hashpassword } });
      return { success: true, message: "Registered  successfully" };

  } catch (error: unknown) {
    console.log(error);
    
        return { success: false, message: "something went wrong ,please try again" };

  }

};

//logout action
export const logoutAction = async () => {
  await signOut();
};
