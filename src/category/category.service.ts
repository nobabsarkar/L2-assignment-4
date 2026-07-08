import { prisma } from "../lib/prisma";
import type { TCategory } from "./category.interface";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await prisma.category.create({
    data: {
      ...payload,
    },
  });

  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany();

  return result;
};

export const categoryService = {
  createCategoryIntoDB,
  getAllCategories,
};
