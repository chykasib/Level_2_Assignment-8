import express from "express";
import { BookController } from "./book.controller";
import auth from "../../middleware/middleware";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/create-book",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.CreateNewBook
);
router.get("/", BookController.getAllBooks);
router.get("/:categoryId/category", BookController.getBooksByCategoryId);
router.get("/:id", BookController.getSingleBook);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.UpdatedSingleBook
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.DeleteSingleBook
);

export const BookRoutes = router;
