import { Router } from "express";
import { propertyController } from "./property.controller";
import { auth } from "../middleware/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.post(
  "/landlord/properties",
  auth(Role.LANDLORD),
  propertyController.createProperty,
);

router.get("/properties", propertyController.getAllProperty);

router.get("/properties/:propertyId", propertyController.getSingleProperty);

//
router.put(
  "/landlord/properties/:propertyId",
  auth(Role.LANDLORD),
  propertyController.updatePropertiesLandlord,
);

router.get(
  "/landlord/requests",
  auth(Role.LANDLORD),
  propertyController.landlordGetRentalRequest,
);

router.get(
  "/landlord/properties",
  auth(Role.LANDLORD),
  propertyController.landlordGetAllProperties,
);

router.delete(
  "/landlord/properties/:propertyId",
  auth(Role.LANDLORD),
  propertyController.deletePropertiesLandlord,
);

router.patch(
  "/landlord/requests/:requestId",
  auth(Role.LANDLORD),
  propertyController.landlordUpdateRentalRequestStatus,
);

export const propertyRoutes = router;
