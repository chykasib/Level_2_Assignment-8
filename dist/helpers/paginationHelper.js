"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
    const minPrice = Number(options.minPrice) || 0;
    const maxPrice = Number(options.maxPrice) || Number.MAX_VALUE;
    const page = Number(options.page || 1);
    const size = Number(options.limit || 10);
    const skip = (page - 1) * size;
    const sortBy = options.sortBy || "price";
    const sortOrder = options.sortOrder || "asc";
    return {
        page,
        size,
        skip,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
    };
};
exports.paginationHelpers = {
    calculatePagination,
};
