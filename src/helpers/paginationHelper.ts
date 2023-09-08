type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
};

type IOptionsResult = {
  page: number;
  size: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
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

export const paginationHelpers = {
  calculatePagination,
};
