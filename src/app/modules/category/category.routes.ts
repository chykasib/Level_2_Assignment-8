import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post("/create-category", CategoryController.CreateCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getSingleCategory);
router.patch("/:id", CategoryController.UpdatedSingleCategory);
router.delete("/:id", CategoryController.DeleteSingleCategory);

export const CategoryRoutes = router;
