import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middleware/middleware";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/create-category",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.CreateCategory
);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getSingleCategory);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.UpdatedSingleCategory
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.DeleteSingleCategory
);

export const CategoryRoutes = router;
