import { Book, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBookFilterRequest } from "./book.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { bookSearchableFields } from "./book.constants";

const CreateNewBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { price: "desc" },
  });
  if (options.minPrice || options.maxPrice) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  id: string,
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: {
      id,
    },
    include: {
      category: true,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { price: "desc" },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdatedSingleBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteSingleBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  CreateNewBook,
  getAllBooks,
  getSingleBook,
  UpdatedSingleBook,
  DeleteSingleBook,
  getBooksByCategoryId,
};
