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

export const propertyRoutes = router;
