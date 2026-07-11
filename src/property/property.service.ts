import type { RentalStatus } from "../../generated/prisma/enums";
import type { PropertyWhereInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";
import type { IPostQuery, IProperty } from "./property.interface";

const createPropertyIntoDB = async (payload: IProperty, landlordId: string) => {
  const result = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });

  return result;
};

const getAllPropertyFromDB = async (query: any) => {
  const andConditions: PropertyWhereInput[] = [];

  if (query.location) {
    andConditions.push({
      location: {
        contains: query.location,
        mode: "insensitive",
      },
    });
  }

  if (query.price) {
    andConditions.push({
      price: {
        lte: Number(query.price),
      },
    });
  }

  const result = await prisma.property.findMany({
    where: {
      AND: andConditions,
    },
    orderBy: {
      createdAt: "asc",
    },

    include: {
      landlord: {
        omit: {
          password: true,
        },
      },
    },
  });

  return result;
};

const getSinglePropertyFromDB = async (propertyId: string) => {
  const result = await prisma.property.findUniqueOrThrow({
    where: { id: propertyId },
  });

  return result;
};

const updatePropertiesLandlordIntoDB = async (
  propertyId: string,
  landlordId: string,
  payload: Partial<IProperty>,
) => {
  const property = await prisma.property.findFirstOrThrow({
    where: {
      id: propertyId,
      landlordId: landlordId,
    },
  });

  if (!property) {
    throw new Error("Property not found.");
  }

  const result = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: payload,
  });

  return result;
};

const deletePropertiesLandlordFromDB = async (
  propertyId: string,
  landlordId: string,
) => {
  await prisma.property.findFirstOrThrow({
    where: {
      id: propertyId,
      landlordId,
    },
  });

  const result = await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });

  return result;
};

const landloadGetRentalRequestFromDB = async (landlordId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId,
      },
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

const landlordUpdateRentalRequestStatusIntoDB = async (
  requestId: string,
  landlordId: string,
  status: RentalStatus,
) => {
  const rentalRequest = await prisma.rentalRequest.findFirstOrThrow({
    where: {
      id: requestId,
      property: {
        landlordId,
      },
    },
  });

  const result = await prisma.rentalRequest.update({
    where: {
      id: rentalRequest.id,
    },
    data: {
      status,
    },
  });

  return result;
};

export const propertySerivce = {
  createPropertyIntoDB,
  getAllPropertyFromDB,
  getSinglePropertyFromDB,
  updatePropertiesLandlordIntoDB,
  deletePropertiesLandlordFromDB,
  landloadGetRentalRequestFromDB,
  landlordUpdateRentalRequestStatusIntoDB,
};
