import express from "express";
import { Product } from "../models/productModel.js";
import { auth } from "../middleware/authMiddleware.js";


const router = express.Router();

// create new product route
router.post('/',auth, async (req, res) => {
    try {
        const { name, priceIncents, image, category, description } = req.body;
        const product = new Product({ name, priceIncents, image, category, description });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET all products route
   router.get('/', async (request, response) => {
    try {
        const product = await Product.find({});

        return response.status(200).json({
            data: product
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get  single product route

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const product = await Product.findById(id);
        return response.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete product route

router.delete('/:id',auth, async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Product.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({
                message: 'Product not found'
            });
        }
        response.status(200).json({
            message: 'Product deleted successfully', deletedItem: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }   
        });

// UPDATE product route

router.put('/:id',auth, async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.priceIncents ||
            !request.body.category
        ) {
            return response.status(400).send({
                message: 'Required fields are missing'
            });
        }

        const { id } = request.params;

        const result = await Product.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Product not found' });
        }

        return response.status(200).send({ message: 'Product updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }

});
 
export default router;