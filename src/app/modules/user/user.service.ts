import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdatedSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteSingleUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  UpdatedSingleUser,
  DeleteSingleUser,
};
