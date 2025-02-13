import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrder);
router.post("/", authMiddleware, createOrder);
router.put("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;