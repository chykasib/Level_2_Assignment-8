import express from "express";
import { BookController } from "./book.controller";

const router = express.Router();

router.post("/create-book", BookController.CreateNewBook);
router.get("/", BookController.getAllBooks);
router.get("/:id", BookController.getSingleBook);
router.patch("/:id", BookController.UpdatedSingleBook);
router.delete("/:id", BookController.DeleteSingleBook);

export const BookRoutes = router;
