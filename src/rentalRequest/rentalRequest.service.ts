import { prisma } from "../lib/prisma";

const createRentalRequest = async (tenantId: string, propertyId: string) => {
  await prisma.property.findUniqueOrThrow({
    where: {
      id: propertyId,
    },
  });

  const isExist = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
    },
  });

  if (isExist) {
    throw new Error("You have already requested this property.");
  }

  const result = await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId,
    },
  });

  return result;
};

export const rentalRequestService = {
  createRentalRequest,
};
