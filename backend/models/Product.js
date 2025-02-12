
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: String, enum: ["In stock", "Out of stock"], required: true },
  imageUrl: { type: String, required: true },
  amazonLink: { type: String, required: true },
  ocadoLink: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);