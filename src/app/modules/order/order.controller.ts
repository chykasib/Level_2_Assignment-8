import { Request, Response } from "express";
import { OrderService } from "./order.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await OrderService.createOrder(req.body, user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await OrderService.getAllOrders(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const getSingleOrderById = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { orderId } = req.params;
  const result = await OrderService.getSingleOrderById(orderId, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrderById,
};
