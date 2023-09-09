import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserProfileService } from "./profile.service";

const getUserProfileData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserProfileService.getUserProfileData();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

export const UserProfileController = {
  getUserProfileData,
};
