import { prisma } from "../lib/prisma";

const createRentalRequestIntoDB = async (
  tenantId: string,
  propertyId: string,
) => {
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

const getAllRentalsRequestFromDB = async (tenantId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      tenantId,
    },
    include: {
      property: true,
    },
    omit: {
      propertyId: true,
    },
  });

  return result;
};

const getSingleRentalsRequestFromDB = async (
  tenantId: string,
  rentalId: string,
) => {
  const result = await prisma.rentalRequest.findFirstOrThrow({
    where: {
      id: rentalId,
      tenantId,
    },

    include: {
      property: true,
    },

    omit: {
      propertyId: true,
    },
  });

  return result;
};

export const rentalRequestService = {
  createRentalRequestIntoDB,
  getAllRentalsRequestFromDB,
  getSingleRentalsRequestFromDB,
};
