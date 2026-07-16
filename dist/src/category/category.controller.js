import { catchAsync } from "../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
const createCategory = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await categoryService.createCategoryIntoDB(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category created successfully",
        data: result,
    });
});
const getAllCategory = catchAsync(async (req, res) => {
    const result = await categoryService.getAllCategories();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category retrived successfully",
        data: result,
    });
});
export const categoryController = {
    createCategory,
    getAllCategory,
};
//# sourceMappingURL=category.controller.js.map