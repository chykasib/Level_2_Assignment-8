import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/create-order", OrderController.createOrder);
router.get("/", OrderController.getAllOrder);
router.get("/:orderId", OrderController.getSingleOrderById);

export const OrderRoutes = router;
