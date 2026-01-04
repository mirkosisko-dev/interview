import {
  Order,
  OrderParams,
  OrderReturn,
  SortBy,
  SortDir,
} from "../types/order-types";

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
  {
    id: 106,
    customerName: "François Dubois",
    country: "France",
    totalAmount: 279.99,
    itemsCount: 2,
    status: "pending",
    createdAt: "2025-12-20T11:30:00Z",
  },
  {
    id: 107,
    customerName: "Greta Nielsen",
    country: "Denmark",
    totalAmount: 189.99,
    itemsCount: 1,
    status: "shipped",
    createdAt: "2025-12-14T13:45:00Z",
  },
  {
    id: 108,
    customerName: "Hans Schmidt",
    country: "Austria",
    totalAmount: 649.99,
    itemsCount: 2,
    status: "delivered",
    createdAt: "2025-12-08T09:15:00Z",
  },
  {
    id: 109,
    customerName: "Iris van Dijk",
    country: "Netherlands",
    totalAmount: 99.99,
    itemsCount: 1,
    status: "cancelled",
    createdAt: "2025-12-16T16:50:00Z",
  },
  {
    id: 110,
    customerName: "Jan Kowalski",
    country: "Poland",
    totalAmount: 329.99,
    itemsCount: 3,
    status: "shipped",
    createdAt: "2025-12-21T10:00:00Z",
  },
  {
    id: 111,
    customerName: "Katherine Jones",
    country: "UK",
    totalAmount: 459.99,
    itemsCount: 1,
    status: "pending",
    createdAt: "2025-12-22T14:20:00Z",
  },
  {
    id: 112,
    customerName: "Lars Olsen",
    country: "Norway",
    totalAmount: 729.99,
    itemsCount: 2,
    status: "delivered",
    createdAt: "2025-12-05T08:30:00Z",
  },
  {
    id: 113,
    customerName: "Maria Fernandez",
    country: "Spain",
    totalAmount: 159.99,
    itemsCount: 1,
    status: "cancelled",
    createdAt: "2025-12-13T15:10:00Z",
  },
  {
    id: 114,
    customerName: "Nikos Papadopoulos",
    country: "Greece",
    totalAmount: 389.99,
    itemsCount: 2,
    status: "pending",
    createdAt: "2025-12-23T11:45:00Z",
  },
  {
    id: 115,
    customerName: "Olga Petrov",
    country: "Russia",
    totalAmount: 549.99,
    itemsCount: 3,
    status: "shipped",
    createdAt: "2025-12-12T12:25:00Z",
  },
  {
    id: 116,
    customerName: "Peter Novak",
    country: "Czech Republic",
    totalAmount: 219.99,
    itemsCount: 1,
    status: "delivered",
    createdAt: "2025-12-07T09:40:00Z",
  },
  {
    id: 117,
    customerName: "Sophie Martin",
    country: "Belgium",
    totalAmount: 179.99,
    itemsCount: 2,
    status: "pending",
    createdAt: "2025-12-24T10:55:00Z",
  },
  {
    id: 118,
    customerName: "Thomas Berg",
    country: "Switzerland",
    totalAmount: 829.99,
    itemsCount: 1,
    status: "shipped",
    createdAt: "2025-12-11T13:30:00Z",
  },
  {
    id: 119,
    customerName: "Ulla Hansen",
    country: "Finland",
    totalAmount: 299.99,
    itemsCount: 2,
    status: "delivered",
    createdAt: "2025-12-06T08:15:00Z",
  },
  {
    id: 120,
    customerName: "Viktor Popov",
    country: "Bulgaria",
    totalAmount: 149.99,
    itemsCount: 1,
    status: "cancelled",
    createdAt: "2025-12-17T16:00:00Z",
  },
  {
    id: 121,
    customerName: "Wolfgang Schmidt",
    country: "Germany",
    totalAmount: 419.99,
    itemsCount: 3,
    status: "pending",
    createdAt: "2025-12-25T14:10:00Z",
  },
  {
    id: 122,
    customerName: "Xavier Martinez",
    country: "Spain",
    totalAmount: 359.99,
    itemsCount: 2,
    status: "shipped",
    createdAt: "2025-12-09T11:50:00Z",
  },
  {
    id: 123,
    customerName: "Yvette Leclerc",
    country: "France",
    totalAmount: 689.99,
    itemsCount: 1,
    status: "delivered",
    createdAt: "2025-12-04T09:20:00Z",
  },
  {
    id: 124,
    customerName: "Zdenek Horak",
    country: "Czech Republic",
    totalAmount: 209.99,
    itemsCount: 2,
    status: "pending",
    createdAt: "2025-12-26T15:35:00Z",
  },
  {
    id: 125,
    customerName: "Anna Lindberg",
    country: "Sweden",
    totalAmount: 579.99,
    itemsCount: 3,
    status: "shipped",
    createdAt: "2025-12-03T10:45:00Z",
  },
];

const orderService = {
  async getOrders(params: OrderParams): Promise<OrderReturn> {
    let result = [...ORDERS];

    const page = params.page ? +params.page : 1;
    const limit = params.limit ? +params.limit : 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    if (params.status && params.status.length > 0) {
      const statuses = params.status;
      result = result.filter((order) => statuses.includes(order.status));
    }

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

    if (params.countFilter && params.itemCount) {
      const itemCount = +params.itemCount;
      if (params.countFilter === "lt")
        result = result.filter((order) => order.itemsCount > itemCount);
      else if (params.countFilter === "eq")
        result = result.filter((order) => order.itemsCount === itemCount);
      else result = result.filter((order) => order.itemsCount < itemCount);
    }

    const paginatedResult = result.slice(startIndex, endIndex);

    return {
      orders: paginatedResult,
      pagination: {
        totalCount: result.length,
        totalPages: Math.ceil(result.length / limit),
      },
    };
  },
};

export default orderService;
