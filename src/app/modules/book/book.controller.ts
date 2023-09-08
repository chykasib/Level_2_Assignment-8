import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";

const CreateNewBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.CreateNewBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ["size", "page", "sortBy", "sortOrder"]);
  const result = await BookService.getAllBooks(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ["size", "page", "sortBy", "sortOrder"]);
  const result = await BookService.getBooksByCategoryId(
    categoryId,
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books with associated category data fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully",
    data: result,
  });
});

const UpdatedSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.UpdatedSingleBook(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const DeleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.DeleteSingleBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book is deleted successfully",
    data: result,
  });
});

export const BookController = {
  CreateNewBook,
  getAllBooks,
  getSingleBook,
  UpdatedSingleBook,
  DeleteSingleBook,
  getBooksByCategoryId,
};
