"use server";
import { prisma } from "@/utils/prisma";
import { ActionType } from "@/utils/types";

export const verificationTokenAction = async (token: string):Promise<ActionType> => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!verificationToken)
      return { success: false, message: "token is not found" };
    const isExpired = new Date(verificationToken.expires) < new Date();
    if (isExpired) return { success: false, message: "token is expired" };
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });
    if (!user) return { success: false, message: "user not found" };
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    return {
      success: true,
      message: "your email address is successfully verified",
    };
  } catch (error) {
    console.error("Verification Error:", error);
    return { success: false, message: "something went wrong" };
  }
};
