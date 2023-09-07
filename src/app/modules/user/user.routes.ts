import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getSingleUser);
router.patch("/:id", UserController.UpdatedSingleUser);
router.delete("/:id", UserController.DeleteSingleUser);

export const UserRoutes = router;
