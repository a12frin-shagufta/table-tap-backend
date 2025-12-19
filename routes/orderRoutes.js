import express from "express";
import {
  placeOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Customer
router.post("/", placeOrder);

// Admin
router.get("/", getOrders);
router.patch("/:id/status", updateOrderStatus);

export default router;
