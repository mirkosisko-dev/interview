import { Request, Response } from "express";
import orderService from "../services/order-service";
import z from "zod";

const getOrdersSchema = z.object({
  status: z.enum(["pending", "shipped", "delivered", "cancelled"]).optional(),
  search: z.string().min(1).max(100).optional(),
  sortBy: z.enum(["createdAt", "totalAmount"]).optional(),
  sortDir: z.enum(["asc", "desc"]).optional(),
});

const orderController = {
  async getOrders(req: Request, res: Response) {
    const validationResult = getOrdersSchema.safeParse(req.query);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.message,
      });
    }
    try {
      const orders = await orderService.getOrders(validationResult.data);
      res.status(200).json({ orders });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default orderController;
