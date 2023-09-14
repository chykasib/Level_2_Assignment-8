import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { UserAuthService } from "./auth.service";
import config from "../../../config";
import { ILoginUserResponse } from "./auth.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserAuthService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserAuthService.loginUser(req.body);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User signin successfully!",
    data: others,
  });
});

export const UserAuthController = {
  createUser,
  loginUser,
};
