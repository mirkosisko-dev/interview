import type { OrderParams, OrderReturn } from "./types";
import {
  ApiError,
  ValidationError,
  ServerError,
  NotFoundError,
} from "../errors";

export const orderApi = {
  async getOrders(params?: OrderParams) {
    const urlParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          urlParams.append(key, value.toString());
        }
      });
    }

    const qs = urlParams.toString();
    const url = `http://localhost:8080/orders${qs ? `?${qs}` : ""}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({
        error: { message: "Failed to parse error response" },
      }));

      const message = errorData.error?.message || "Failed to fetch orders";
      const code = errorData.error?.code;

      if (res.status >= 500) {
        throw new ServerError(message);
      }

      if (res.status === 400) {
        throw new ValidationError(message);
      }

      if (res.status === 404) {
        throw new NotFoundError(message);
      }

      throw new ApiError(message, res.status, code);
    }

    const data: OrderReturn = await res.json();

    return data;
  },
};
