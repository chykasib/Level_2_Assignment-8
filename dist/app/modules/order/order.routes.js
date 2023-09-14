"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const middleware_1 = __importDefault(require("../../middleware/middleware"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// router.post(
//   "/create-order",
//   auth(ENUM_USER_ROLE.CUSTOMER),
//   OrderController.createOrder
// );
router.get("/", (0, middleware_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, middleware_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getAllOrder);
router.get("/:orderId", (0, middleware_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, middleware_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getSingleOrderById);
exports.OrderRoutes = router;
