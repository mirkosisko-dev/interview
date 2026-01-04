import { Request, Response } from "express";
import orderService from "../services/order-service";
import z from "zod";
import { OrderStatus } from "../types/order-types";

const getOrdersSchema = z.object({
  status: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) as OrderStatus[];
    }),
  search: z.string().min(1).max(100).optional(),
  sortBy: z.enum(["createdAt", "totalAmount"]).optional(),
  sortDir: z.enum(["asc", "desc"]).optional(),
  countFilter: z.enum(["lt", "eq", "st"]).optional(),
  itemCount: z.string().min(1).max(100).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
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
      const response = await orderService.getOrders(validationResult.data);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default orderController;
