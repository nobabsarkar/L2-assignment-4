import { catchAsync } from "../utils/catchAsync";
import { rentalRequestService } from "./rentalRequest.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
const createRentalRequest = catchAsync(async (req, res) => {
    const tenantId = req.user?.id;
    const { propertyId } = req.body;
    const result = await rentalRequestService.createRentalRequestIntoDB(tenantId, propertyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request created successfully",
        data: result,
    });
});
const getAllRentalRequest = catchAsync(async (req, res) => {
    const tenantId = req.user?.id;
    const result = await rentalRequestService.getAllRentalsRequestFromDB(tenantId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request retrived successfully",
        data: result,
    });
});
const getSingleRentalsRequest = catchAsync(async (req, res) => {
    const tenantId = req.user?.id;
    const { rentalId } = req.params;
    const result = await rentalRequestService.getSingleRentalsRequestFromDB(tenantId, rentalId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request retrived successfully",
        data: result,
    });
});
export const rentalRequestController = {
    createRentalRequest,
    getAllRentalRequest,
    getSingleRentalsRequest,
};
//# sourceMappingURL=rentalRequest.controller.js.map