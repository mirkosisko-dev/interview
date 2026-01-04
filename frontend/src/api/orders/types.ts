export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
export type SortBy = "createdAt" | "totalAmount";
export type SortDir = "asc" | "desc";
export type CountFilter = "lt" | "eq" | "st";

export type Order = {
  id: number;
  customerName: string;
  country: string;
  totalAmount: number;
  itemsCount: number;
  status: OrderStatus;
  createdAt: string;
};

export type OrderParams = {
  status?: OrderStatus[];
  search?: string;
  sortBy?: SortBy;
  sortDir?: SortDir;
  countFilter?: CountFilter;
  itemCount?: string;
  page?: string;
  limit?: string;
};

export type PaginationMetadata = {
  totalCount: number;
  totalPages: number;
};

export type OrderReturn = {
  orders: Order[];
  pagination: PaginationMetadata;
};
