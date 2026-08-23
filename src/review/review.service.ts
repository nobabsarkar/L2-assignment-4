import { PaymentStatus } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import type { IReview } from "./review.interface";

const createReviewIntoDB = async (tenantId: string, payload: IReview) => {
  // 1. Validate rating
  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // 2. Find the payment
  const payment = await prisma.payment.findFirst({
    where: {
      id: payload?.paymentId,
      tenantId,
      status: PaymentStatus.COMPLETED,
    },
    include: {
      rentalRequest: {
        select: {
          id: true,
          tenantId: true,
          propertyId: true,
        },
      },
    },
  });

  // 3. Payment must exist and be completed
  if (!payment) {
    throw new Error("You can review only after successful payment");
  }

  // 4. Get property ID from the payment's rental request
  const propertyId = payment.rentalRequest.propertyId;

  // 5. Prevent duplicate review
  const existingReview = await prisma.review.findFirst({
    where: {
      tenantId,
      propertyId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this property");
  }

  // 6. Create review
  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      tenantId,
      propertyId,
    },
  });

  return result;
};

export const reviewService = {
  createReviewIntoDB,
};
