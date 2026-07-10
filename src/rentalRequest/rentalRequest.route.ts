import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../middleware/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.post(
  "/rentals",
  auth(Role.TENANT),
  rentalRequestController.createRentalRequest,
);

router.get(
  "/rentals",
  auth(Role.TENANT),
  rentalRequestController.getAllRentalRequest,
);

router.get(
  "/rentals/:rentalId",
  auth(Role.TENANT),
  rentalRequestController.getSingleRentalsRequest,
);

export const rentalRquestRoutes = router;
