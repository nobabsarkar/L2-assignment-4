import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../middleware/auth";
import { Role } from "../../generated/prisma/enums";
const router = Router();
router.post("/register", userController.registerUser);
router.get("/me", auth(Role.ADMIN, Role.TENANT, Role.LANDLORD), userController.getMyProfile);
router.get("/admin/users", auth(Role.ADMIN), userController.getAllUsers);
router.patch("/admin/users/:userId", auth(Role.ADMIN), userController.updateUserStatus);
router.get("/admin/properties", auth(Role.ADMIN), userController.getAllProperties);
router.get("/admin/rentals", auth(Role.ADMIN), userController.getAllRentalRequest);
export const userRoutes = router;
//# sourceMappingURL=user.route.js.map