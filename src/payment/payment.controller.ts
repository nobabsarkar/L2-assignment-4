import { catchAsync } from "../utils/catchAsync";
import { paymentService } from "./payment.service";

const verifyPayment = catchAsync(async (req, res) => {
  const { propertyId, tranId, status } = req.query;
  const payload = req.body;

  const result = await paymentService.validatePayment(
    propertyId as string,
    tranId as string,
    status as string,
    payload,
  );

  if (result === "success") {
    res.redirect("https://web.programming-hero.com/dashboard");
  }
});

export const paymentController = {
  verifyPayment,
};
