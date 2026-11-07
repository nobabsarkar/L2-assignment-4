import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";

const initiatePayment = catchAsync(async (req, res) => {
  const paymentUrl = await paymentService.initiatePaymentIntoDB(
    req.body.rentalRequestId,
    req?.user?.id as string,
  );

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

  const result = await paymentService.validatePayment(
    rentalRequestId as string,
    tranId as string,
    status as string,
    payload,
  );

  if (result === "success") {
    res.redirect(
      // `http://localhost:3000/tenant-dashboard/payment-success/${tranId}`,
      `https://level2-assignment-5-cyan.vercel.app/tenant-dashboard/payment-success/${tranId}`,
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment verified successfully",
    data: result,
  });
});

const getMyPayments = catchAsync(async (req, res) => {
  const result = await paymentService.getMyPaymentsFromDB(
    req.user?.id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history retrived successfully",
    data: result,
  });
});

const getSinglepayments = catchAsync(async (req, res) => {
  const transactionId = req.params.transactionId;

  const result = await paymentService.getSinglePaymentsFromDB(
    transactionId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history retrived successfully",
    data: result,
  });
});

const getLandlordEarnings = catchAsync(async (req, res) => {
  const landlordId = req?.user?.id;

  const result = await paymentService.getLandlordEarningsFromDB(
    landlordId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Landlord earnings retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  verifyPayment,
  initiatePayment,
  getMyPayments,
  getSinglepayments,
  getLandlordEarnings,
};
