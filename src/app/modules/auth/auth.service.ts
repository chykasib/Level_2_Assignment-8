import { User } from "@prisma/client";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const createUser = async (data: User): Promise<User> => {
  const createUser = await prisma.user.create({
    data,
  });
  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  return createUser;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (isUserExist.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserAuthService = {
  createUser,
  loginUser,
};
