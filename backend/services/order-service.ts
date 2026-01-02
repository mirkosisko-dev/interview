import { Order, OrderParams, SortBy, SortDir } from "../types/order-types";

const ORDERS: Order[] = [
  {
    id: 101,
    customerName: "Alice Müller",
    country: "Germany",
    totalAmount: 349.99,
    itemsCount: 1,
    status: "pending",
    createdAt: "2025-12-18T10:15:00Z",
  },
  {
    id: 102,
    customerName: "Bruno Silva",
    country: "Portugal",
    totalAmount: 129.5,
    itemsCount: 2,
    status: "shipped",
    createdAt: "2025-12-17T09:00:00Z",
  },
  {
    id: 103,
    customerName: "Carla Rossi",
    country: "Italy",
    totalAmount: 899.0,
    itemsCount: 1,
    status: "delivered",
    createdAt: "2025-12-10T16:30:00Z",
  },
  {
    id: 104,
    customerName: "David Smith",
    country: "UK",
    totalAmount: 59.99,
    itemsCount: 1,
    status: "cancelled",
    createdAt: "2025-12-15T14:45:00Z",
  },
  {
    id: 105,
    customerName: "Emma Johansson",
    country: "Sweden",
    totalAmount: 499.99,
    itemsCount: 3,
    status: "delivered",
    createdAt: "2025-12-19T08:20:00Z",
  },
];

const orderService = {
  async getOrders(params: OrderParams) {
    let result = [...ORDERS];

    if (params.status)
      result = result.filter((order) => order.status === params.status);

    if (typeof params.search === "string" && params.search.trim().length > 0) {
      const term = params.search.toLowerCase();
      result = result.filter((order) =>
        order.customerName.toLowerCase().includes(term),
      );
    }

    const sortField: SortBy =
      params.sortBy === "totalAmount" ? "totalAmount" : "createdAt";
    const direction: SortDir =
      params.sortDir === "asc" || params.sortDir === "desc"
        ? params.sortDir
        : "asc";

    result.sort((a, b) => {
      if (sortField === "createdAt") {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();

        return direction === "asc" ? timeA - timeB : timeB - timeA;
      } else {
        return direction === "asc"
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount;
      }
    });

    return result;
  },
};

export default orderService;
