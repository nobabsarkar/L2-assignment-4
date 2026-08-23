import type { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id;

  if (!tenantId) {
    throw new Error("Unauthorized");
  }

  const payload = req.body;

  const result = await reviewService.createReviewIntoDB(tenantId, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
};
