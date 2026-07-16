import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
import { reviewService } from "./review.service";
const createReview = catchAsync(async (req, res) => {
    const tenantId = req.user?.id;
    const payload = req.body;
    const result = await reviewService.createReviewIntoDB(tenantId, payload);
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
//# sourceMappingURL=review.controller.js.map