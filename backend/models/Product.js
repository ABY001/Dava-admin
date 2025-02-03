
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["In stock", "Out of stock"], required: true },
  sku: { type: String, unique: true, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);