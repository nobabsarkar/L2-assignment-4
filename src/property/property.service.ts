import { prisma } from "../lib/prisma";
import type { IProperty } from "./property.interface";

const createPropertyIntoDB = async (payload: IProperty, landlordId: string) => {
  const result = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });

  return result;
};

export const propertySerivce = {
  createPropertyIntoDB,
};
