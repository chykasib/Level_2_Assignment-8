import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createOrder = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getAllOrder = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany();
  return result;
};

const getSingleOrderById = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrderById,
};
