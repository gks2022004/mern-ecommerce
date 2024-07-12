import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import productRoute from "./routes/productRoute.js";
import stripeRoute from "./routes/stripeRoute.js";

config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose
    .connect(process.env.MongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("MongoDB connection error: ", err));

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer and Cloudinary setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const parser = multer({ storage: storage });

// Routes
app.use('/product', productRoute);
app.use('/stripe', stripeRoute); // Ensure this is correctly set up

// Upload route
app.post("/upload", parser.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }
    try {
        res.json({ secure_url: req.file.path });
    } catch (error) {
        console.error("Error during file upload: ", error);
        res.status(500).send("Internal server error");
    }
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
