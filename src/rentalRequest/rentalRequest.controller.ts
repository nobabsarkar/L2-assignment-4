import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { rentalRequestService } from "./rentalRequest.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";

const rentalRequest = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id;
  const { propertyId } = req.body;

  const result = await rentalRequestService.createRentalRequest(
    tenantId as string,
    propertyId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental request created successfully",
    data: result,
  });
});
export const rentalRequestController = {
  rentalRequest,
};
