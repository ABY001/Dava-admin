import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import multer from "multer";
import streamifier from "streamifier";
import { v2 as cloudinary } from 'cloudinary'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Multer Memory Storage
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Video Schema
const VideoSchema = new mongoose.Schema({
  videoUrl: String,
  publicId: String,
  uploadedAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", VideoSchema);

app.post('/photos/upload', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image', msg: 'No file received' });
    }

    // Upload to Cloudinary using a stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'product-images' }, // Specify the folder in Cloudinary
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return res.status(500).json({ error: 'Upload to Cloudinary failed' });
        }
        // Success: Return the Cloudinary URL
        res.json({ imageUrl: result.secure_url });
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});


app.post('/videos/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a video', msg: 'No file received' });
    }

    // Upload to Cloudinary using a stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "product-videos" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: "Cloudinary Upload Failed" });

        // Remove existing video (only one video should be active)
        await Video.deleteMany();

        const newVideo = new Video({ videoUrl: result.secure_url, publicId: result.public_id });
        await newVideo.save();

        res.json({ videoUrl: result.secure_url, videoId: newVideo._id });
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});

// **Get Latest Video (Client)**
app.get("/videos/latest", async (req, res) => {
  try {
    const video = await Video.findOne().sort({ uploadedAt: -1 });
    if (!video) return res.status(404).json({ error: "No video found" });

    res.json({ videoUrl: video.videoUrl });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// **Delete Video (Admin)**
app.delete("/videos/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });
    await Video.findByIdAndDelete(req.params.id);

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.status(200)
    .json({
      status: 200,
      message: "Yes, you just hit the right cord, keep going fam"
    })
})
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));