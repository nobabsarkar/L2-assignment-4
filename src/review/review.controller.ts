import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id;
  const payload = req.body;

  const result = await reviewService.createReviewIntoDB(
    tenantId as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review create successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
};
