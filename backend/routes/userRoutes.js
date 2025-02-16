import express from "express";
import { createUser, getUsers, updateUser, deleteUser, getUser } from '../controllers/userController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;