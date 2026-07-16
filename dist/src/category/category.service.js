import { prisma } from "../lib/prisma";
const createCategoryIntoDB = async (payload) => {
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
//# sourceMappingURL=category.service.js.map