import { prisma } from "./prisma";

interface VerificationAttemptData {
  userId: string;
  email: string;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export const logVerificationAttempt = async ({
  userId,
  email,
  success,
  ipAddress,
  userAgent,
}: VerificationAttemptData) => {
  await prisma.emailVerificationAttempt.create({
    data: {
      userId,
      email,
      success,
      ipAddress,
      userAgent,
      createdAt: new Date(), // Using createdAt instead of timestamp based on schema
    },
  });
};
