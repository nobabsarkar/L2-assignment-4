import { catchAsync } from "../utils/catchAsync";
import { propertySerivce } from "./property.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
const createProperty = catchAsync(async (req, res) => {
    const landlordId = req.user?.id;
    const result = await propertySerivce.createPropertyIntoDB(req.body, landlordId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property create successfully",
        data: result,
    });
});
const getAllProperty = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await propertySerivce.getAllPropertyFromDB(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property retrived successfully",
        data: result,
    });
});
const getSingleProperty = catchAsync(async (req, res) => {
    const { propertyId } = req.params;
    const result = await propertySerivce.getSinglePropertyFromDB(propertyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property retrived successfully",
        data: result,
    });
});
const updatePropertiesLandlord = catchAsync(async (req, res) => {
    const propertyId = req.params.propertyId;
    const landlordId = req.user?.id;
    const result = await propertySerivce.updatePropertiesLandlordIntoDB(propertyId, landlordId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property update successfully",
        data: result,
    });
});
const deletePropertiesLandlord = catchAsync(async (req, res) => {
    const propertyId = req.params.propertyId;
    const landlordId = req.user?.id;
    const result = await propertySerivce.deletePropertiesLandlordFromDB(propertyId, landlordId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: " Delete property successfully",
        data: result,
    });
});
const landlordGetRentalRequest = catchAsync(async (req, res) => {
    const landlordId = req.user?.id;
    const result = await propertySerivce.landloadGetRentalRequestFromDB(landlordId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Landlord get rental request successfully",
        data: result,
    });
});
const landlordUpdateRentalRequestStatus = catchAsync(async (req, res) => {
    const landlordId = req.user?.id;
    const requestId = req.params.requestId;
    const { status } = req.body;
    const result = await propertySerivce.landlordUpdateRentalRequestStatusIntoDB(requestId, landlordId, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Landlord update rental request status successfully",
        data: result,
    });
});
export const propertyController = {
    createProperty,
    getAllProperty,
    getSingleProperty,
    updatePropertiesLandlord,
    deletePropertiesLandlord,
    landlordGetRentalRequest,
    landlordUpdateRentalRequestStatus,
};
//# sourceMappingURL=property.controller.js.map