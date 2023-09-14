"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const middleware_1 = __importDefault(require("../../middleware/middleware"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post("/create-book", (0, middleware_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.CreateNewBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/:categoryId/category", book_controller_1.BookController.getBooksByCategoryId);
router.get("/:id", book_controller_1.BookController.getSingleBook);
router.patch("/:id", (0, middleware_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.UpdatedSingleBook);
router.delete("/:id", (0, middleware_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.DeleteSingleBook);
exports.BookRoutes = router;
