import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";

//generate verification token
export const generateverificationToken = async (email: string) => {
  const VerificationToken = await prisma.verificationToken.findFirst({
    where: { email },
  });
  if (VerificationToken)
    await prisma.verificationToken.delete({
      where: { id: VerificationToken.id },
    });

  const newVerificationToken = await prisma.verificationToken.create({
    data: {
      token: randomUUID(),
      expires: new Date(new Date().getTime() + 3600 * 1000 * 2),
      email,
    },
  });
  return newVerificationToken;
};



//generate Forgot Password token
export const generateForgotPasswordToken = async (email: string) => {
  const VerificationToken = await prisma.verificationToken.findFirst({
    where: { email },
  });
  if (VerificationToken)
    await prisma.verificationToken.delete({
      where: { id: VerificationToken.id },
    });

  const newVerificationToken = await prisma.verificationToken.create({
    data: {
      token: randomUUID(),
      expires: new Date(new Date().getTime() + 3600 * 1000 * 2),
      email,
    },
  });
  return newVerificationToken;
};
