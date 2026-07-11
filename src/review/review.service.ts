import { prisma } from "../lib/prisma";

interface IReview {
  rating: number;
  comment: string;
  tenantId: string;
  propertyId: string;
}

const createReviewIntoDB = async (tenantId: string, payload: IReview) => {
  const result = await prisma.review.create({
    data: {
      ...payload,
      tenantId,
    },
    include: {
      tenant: true,
      property: true,
    },
    omit: {
      tenantId: true,
      propertyId: true,
    },
  });

  return result;
};

export const reviewService = {
  createReviewIntoDB,
};
