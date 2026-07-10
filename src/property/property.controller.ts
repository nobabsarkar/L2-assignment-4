import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { propertySerivce } from "./property.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req.user?.id;

  const result = await propertySerivce.createPropertyIntoDB(
    req.body,
    landlordId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property create successfully",
    data: result,
  });
});

const getAllProperty = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await propertySerivce.getAllPropertyFromDB(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property retrived successfully",
    data: result,
  });
});

const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
  const { propertyId } = req.params;

  const result = await propertySerivce.getSinglePropertyFromDB(
    propertyId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property retrived successfully",
    data: result,
  });
});

const updatePropertiesLandlord = catchAsync(
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;
    const landlordId = req.user?.id;

    const result = await propertySerivce.updatePropertiesLandlordIntoDB(
      propertyId as string,
      landlordId as string,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property update successfully",
      data: result,
    });
  },
);

const deletePropertiesLandlord = catchAsync(
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;
    const landlordId = req.user?.id;

    const result = await propertySerivce.deletePropertiesLandlordFromDB(
      propertyId as string,
      landlordId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: " Delete property successfully",
      data: result,
    });
  },
);

export const propertyController = {
  createProperty,
  getAllProperty,
  getSingleProperty,
  updatePropertiesLandlord,
  deletePropertiesLandlord,
};
