import { catchAsync } from "../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
const loginUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUserIntoDB(payload);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login successfully",
        data: {
            accessToken,
            refreshToken,
        },
    });
});
const refreshToken = catchAsync(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshToken(refreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refresh successfully",
        data: {
            accessToken,
        },
    });
});
export const authController = {
    loginUser,
    refreshToken,
};
//# sourceMappingURL=auth.controller.js.map