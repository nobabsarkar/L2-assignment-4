import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth } from "../middleware/auth";
import { Role } from "../../generated/prisma/enums";
const router = Router();
router.post("/category", auth(Role.ADMIN), categoryController.createCategory);
router.get("/categories", categoryController.getAllCategory);
export const categoryRoutes = router;
//# sourceMappingURL=category.route.js.map