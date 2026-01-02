import { describe, it, expect } from "vitest";
import orderService from "./order-service";

describe("orderService", () => {
  describe("getOrders - basic functionality", () => {
    it("should return all orders when no params provided", async () => {
      const orders = await orderService.getOrders({});
      expect(orders).toHaveLength(5);
    });

    it("should return empty params and still work", async () => {
      const orders = await orderService.getOrders({});
      expect(orders.length).toBeGreaterThan(0);
    });
  });

  describe("getOrders - filter by status", () => {
    it("should filter orders by 'pending' status", async () => {
      const orders = await orderService.getOrders({ status: "pending" });
      expect(orders).toHaveLength(1);
      expect(orders[0].status).toBe("pending");
    });

    it("should filter orders by 'shipped' status", async () => {
      const orders = await orderService.getOrders({ status: "shipped" });
      expect(orders).toHaveLength(1);
      expect(orders[0].status).toBe("shipped");
    });

    it("should filter orders by 'delivered' status", async () => {
      const orders = await orderService.getOrders({ status: "delivered" });
      expect(orders).toHaveLength(2);
      expect(orders.every((order) => order.status === "delivered")).toBe(true);
    });

    it("should filter orders by 'cancelled' status", async () => {
      const orders = await orderService.getOrders({ status: "cancelled" });
      expect(orders).toHaveLength(1);
      expect(orders[0].status).toBe("cancelled");
    });
  });

  describe("getOrders - search by customer name", () => {
    it("should search orders by customer name (case insensitive)", async () => {
      const orders = await orderService.getOrders({ search: "alice" });
      expect(orders).toHaveLength(1);
      expect(orders[0].customerName).toContain("Alice");
    });

    it("should search orders by partial name", async () => {
      const orders = await orderService.getOrders({ search: "Silva" });
      expect(orders).toHaveLength(1);
      expect(orders[0].customerName).toContain("Silva");
    });

    it("should return empty array when no match found", async () => {
      const orders = await orderService.getOrders({ search: "nonexistent" });
      expect(orders).toHaveLength(0);
    });

    it("should handle empty search string", async () => {
      const orders = await orderService.getOrders({ search: "" });
      expect(orders.length).toBeGreaterThan(0);
    });

    it("should handle whitespace-only search", async () => {
      const orders = await orderService.getOrders({ search: "   " });
      expect(orders.length).toBeGreaterThan(0);
    });
  });

  describe("getOrders - sort by createdAt", () => {
    it("should sort orders by createdAt ascending (oldest first)", async () => {
      const orders = await orderService.getOrders({
        sortBy: "createdAt",
        sortDir: "asc",
      });
      expect(orders[0].customerName).toBe("Carla Rossi");
      expect(orders[orders.length - 1].customerName).toBe("Emma Johansson");
    });

    it("should sort orders by createdAt descending (newest first)", async () => {
      const orders = await orderService.getOrders({
        sortBy: "createdAt",
        sortDir: "desc",
      });
      expect(orders[0].customerName).toBe("Emma Johansson");
      expect(orders[orders.length - 1].customerName).toBe("Carla Rossi");
    });

    it("should default to ascending when sortDir not provided", async () => {
      const orders = await orderService.getOrders({ sortBy: "createdAt" });
      expect(orders[0].customerName).toBe("Carla Rossi");
    });
  });

  describe("getOrders - sort by totalAmount", () => {
    it("should sort orders by totalAmount ascending (cheapest first)", async () => {
      const orders = await orderService.getOrders({
        sortBy: "totalAmount",
        sortDir: "asc",
      });
      expect(orders[0].totalAmount).toBe(59.99);
      expect(orders[orders.length - 1].totalAmount).toBe(899.0);
    });

    it("should sort orders by totalAmount descending (most expensive first)", async () => {
      const orders = await orderService.getOrders({
        sortBy: "totalAmount",
        sortDir: "desc",
      });
      expect(orders[0].totalAmount).toBe(899.0);
      expect(orders[orders.length - 1].totalAmount).toBe(59.99);
    });
  });

  describe("getOrders - combined filters and sort", () => {
    it("should filter by status and sort by createdAt", async () => {
      const orders = await orderService.getOrders({
        status: "delivered",
        sortBy: "createdAt",
        sortDir: "asc",
      });
      expect(orders).toHaveLength(2);
      expect(orders[0].customerName).toBe("Carla Rossi");
      expect(orders[1].customerName).toBe("Emma Johansson");
    });

    it("should search and sort by totalAmount", async () => {
      const orders = await orderService.getOrders({
        search: "emma",
        sortBy: "totalAmount",
        sortDir: "asc",
      });
      expect(orders).toHaveLength(1);
      expect(orders[0].customerName).toContain("Emma");
    });

    it("should filter, search, and sort together", async () => {
      const orders = await orderService.getOrders({
        status: "delivered",
        search: "carla",
        sortBy: "totalAmount",
        sortDir: "desc",
      });
      expect(orders).toHaveLength(1);
      expect(orders[0].customerName).toBe("Carla Rossi");
      expect(orders[0].status).toBe("delivered");
    });
  });

  describe("getOrders - edge cases", () => {
    it("should handle invalid sortBy gracefully", async () => {
      const orders = await orderService.getOrders({
        sortBy: "invalid" as any,
      });
      expect(orders.length).toBeGreaterThan(0);
    });

    it("should handle invalid sortDir gracefully (defaults to asc)", async () => {
      const orders = await orderService.getOrders({
        sortBy: "createdAt",
        sortDir: "invalid" as any,
      });
      expect(orders.length).toBeGreaterThan(0);
      expect(orders[0].customerName).toBe("Carla Rossi");
    });

    it("should handle all optional params as undefined", async () => {
      const orders = await orderService.getOrders({
        status: undefined,
        search: undefined,
        sortBy: undefined,
        sortDir: undefined,
      });
      expect(orders).toHaveLength(5);
    });

    it("should return correct order of combined operations", async () => {
      const orders = await orderService.getOrders({
        status: "delivered",
        sortBy: "totalAmount",
        sortDir: "asc",
      });
      expect(orders).toHaveLength(2);
      expect(orders[0].totalAmount).toBeLessThan(orders[1].totalAmount);
    });
  });
});
