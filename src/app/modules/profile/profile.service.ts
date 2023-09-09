import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getUserProfileData = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserProfileService = {
  getUserProfileData,
};
