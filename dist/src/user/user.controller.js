import { catchAsync } from "../utils/catchAsync";
import { userSerivce } from "./user.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
const registerUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const user = await userSerivce.registerUserIntoDB(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User registration successfully",
        data: user,
    });
});
const getMyProfile = catchAsync(async (req, res) => {
    const profile = await userSerivce.getMyProfileFromDB(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile retrived successfully",
        data: profile,
    });
});
const getAllUsers = catchAsync(async (req, res) => {
    const result = await userSerivce.getAllUsersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile retrived successfully",
        data: result,
    });
});
const updateUserStatus = catchAsync(async (req, res) => {
    const adminId = req.user?.id;
    const { userId } = req.params;
    const { status } = req.body;
    const result = await userSerivce.updateUserStatusIntoDB(adminId, userId, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User status updated successfully",
        data: result,
    });
});
const getAllProperties = catchAsync(async (req, res) => {
    const result = await userSerivce.getAllPropertiesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property retrived successfully",
        data: result,
    });
});
const getAllRentalRequest = catchAsync(async (req, res) => {
    const result = await userSerivce.getAllRentalsRequestFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request retrived successfully",
        data: result,
    });
});
export const userController = {
    registerUser,
    getMyProfile,
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequest,
};
//# sourceMappingURL=user.controller.js.map