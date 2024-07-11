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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
    .connect(process.env.MongoDb)
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((err) => {
        console.log(err);
    });
app.use(express.json());

app.use('/product',productRoute);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
app.use((req,res,next) => {
    req.cloudinary=cloudinary;
    next();
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images",
        allowedFormats: ["jpg", "png", "jpeg"],
    },
});

const parser = multer({ storage: storage });

//route for uploading images to cloudinary
app.post("/upload", parser.single("image"), (req, res) => {
    if(!req.file){
        return res.status(400).send("No file uploaded");
    }
    try {
        if (!req.file.path) {
            throw new Error('File uploaded, but no path available');
        }

        res.json({ secure_url: req.file.path });
    } catch (error) {
        console.error('Error during file upload: ', error);
        res.status(500).send('Internal server error');
    }
    });

    app.use('/stripe', stripeRoute);