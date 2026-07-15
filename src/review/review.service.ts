import { PaymentStatus } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import type { IReview } from "./review.interface";

const createReviewIntoDB = async (tenantId: string, payload: IReview) => {
  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const payment = await prisma.payment.findFirst({
    where: {
      tenantId,
      status: PaymentStatus.COMPLETED,
      rentalRequest: {
        propertyId: payload.propertyId,
      },
    },
  });

  if (!payment) {
    throw new Error("You can review only after successfull payment");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this property");
  }

  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      tenantId,
      propertyId: payload.propertyId,
    },
  });

  return result;
};

export const reviewService = {
  createReviewIntoDB,
};
