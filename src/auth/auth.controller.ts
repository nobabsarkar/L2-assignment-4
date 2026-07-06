import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.loginUserIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Login successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
};
