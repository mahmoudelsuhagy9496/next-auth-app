"use server";

import { LoginSchema, RegisterSchema } from "@/utils/ValidationSchemes";
import { prisma } from "@/utils/prisma";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
// type LoginDto = z.infer<typeof LoginSchema>;

//Login action
export const LoginAction = async (data: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid credentials " };
  }
  console.log(data);
  return { success: "logged in successfully" };
};



//register action
export const RegisterAction = async (data: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials " };
  }

  const { name, email, password } = validation.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) return { success: false, message: "user already exist" };

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  await prisma.user.create({ data: { name, email, password: hashpassword } });

  console.log(data);
  return { success:true,message: "Registered  successfully" };
};
