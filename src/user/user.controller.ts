import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { userSerivce } from "./user.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await userSerivce.registerUserIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registration successfully",
    data: user,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const profile = await userSerivce.getMyProfileFromDB(req.user?.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrived successfully",
    data: profile,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userSerivce.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrived successfully",
    data: result,
  });
});

export const userController = {
  registerUser,
  getMyProfile,
  getAllUsers,
};
