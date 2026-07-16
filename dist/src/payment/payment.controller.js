import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";
const initiatePayment = catchAsync(async (req, res) => {
    const paymentUrl = await paymentService.initiatePaymentIntoDB(req.body.rentalRequestId, req?.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment successfully",
        data: paymentUrl,
    });
});
const verifyPayment = catchAsync(async (req, res) => {
    const { rentalRequestId, tranId, status } = req.query;
    const payload = req.body;
    const result = await paymentService.validatePayment(rentalRequestId, tranId, status, payload);
    if (result === "success") {
        res.redirect("http://localhost:5000/payment-success");
    }
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment verified successfully",
        data: result,
    });
});
const getMyPayments = catchAsync(async (req, res) => {
    const result = await paymentService.getMyPaymentsFromDB(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment history retrived successfully",
        data: result,
    });
});
const getSinglepayments = catchAsync(async (req, res) => {
    const paymentId = req.params.paymentId;
    const result = await paymentService.getSinglePaymentsFromDB(paymentId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment history retrived successfully",
        data: result,
    });
});
export const paymentController = {
    verifyPayment,
    initiatePayment,
    getMyPayments,
    getSinglepayments,
};
//# sourceMappingURL=payment.controller.js.map