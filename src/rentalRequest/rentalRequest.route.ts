import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../middleware/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.post(
  "/rentals",
  auth(Role.TENANT),
  rentalRequestController.rentalRequest,
);

export const rentalRquestRoutes = router;
