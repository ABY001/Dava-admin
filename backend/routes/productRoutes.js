import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProduct);
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;