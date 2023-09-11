import express from "express";
import { UserAuthController } from "./auth.controller";
const router = express.Router();

router.post("/signup", UserAuthController.createUser);
router.post("/signin", UserAuthController.loginUser);
export const AuthRoutes = router;
