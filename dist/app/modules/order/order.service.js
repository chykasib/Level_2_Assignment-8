"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: {
            userId: userId,
            orderedBooks: {
                create: data.orderedBooks.map((item) => ({
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
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    else {
        query = {
            include: {
                orderedBooks: true,
            },
        };
    }
    const result = yield prisma_1.default.order.findMany(query);
    return result;
});
const getSingleOrderById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        include: {
            orderedBooks: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "No result found");
    }
    if (user.role !== "admin") {
        if (result.userId !== user.userId) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "No result found for you");
        }
    }
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrderById,
};
