import express from "express";
import { UserProfileController } from "./profile.controller";
import auth from "../../middleware/middleware";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  UserProfileController.getUserProfileData
);

export const UserProfileRoutes = router;
