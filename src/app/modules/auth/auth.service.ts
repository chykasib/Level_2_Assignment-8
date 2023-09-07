import { User } from "@prisma/client";

import prisma from "../../../shared/prisma";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";

const createUser = async (data: User): Promise<User> => {
  const createUser = await prisma.user.create({
    data,
  });
  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  return createUser;
};

export const AuthService = {
  createUser,
};
