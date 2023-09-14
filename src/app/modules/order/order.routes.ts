import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../middleware/middleware";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/create-order",
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  OrderController.getAllOrder
);
router.get(
  "/:orderId",
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  OrderController.getSingleOrderById
);

export const OrderRoutes = router;
