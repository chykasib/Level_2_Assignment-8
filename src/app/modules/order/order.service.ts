import { OrderedBook, Order } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";

const createOrder = async (data: any, userId: string): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks: {
        create: data.orderedBooks.map((item: OrderedBook) => ({
          bookId: item.bookId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getAllOrders = async (user: any): Promise<Order[]> => {
  let query = {};

  if (user.role === "customer") {
    query = {
      where: {
        userId: user.userId,
      },
      include: {
        orderedBooks: true,
      },
    };
  } else {
    query = {
      include: {
        orderedBooks: true,
      },
    };
  }
  const result = await prisma.order.findMany(query);

  return result;
};

const getSingleOrderById = async (
  id: string,
  user: any
): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderedBooks: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No result found");
  }

  if (user.role !== "admin") {
    if (result.userId !== user.userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "No result found for you");
    }
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrderById,
};
