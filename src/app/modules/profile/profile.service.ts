import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getUserProfileData = async (userId: any): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId.userId,
    },
  });
  return result;
};

export const UserProfileService = {
  getUserProfileData,
};
