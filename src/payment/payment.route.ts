import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../middleware/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.post(
  "/payments/create",
  auth(Role.TENANT),
  paymentController.initiatePayment,
);

router.post("/payments/confirm", paymentController.verifyPayment);

router.get("/payments", auth(Role.TENANT), paymentController.getMyPayments);

router.get(
  "/payments/:transactionId",
  auth(Role.TENANT),
  paymentController.getSinglepayments,
);

router.get(
  "/landlord/earnings",
  auth(Role.LANDLORD),
  paymentController.getLandlordEarnings,
);

export const paymentRoutes = router;
