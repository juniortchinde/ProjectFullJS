const Product = require("../models/Product.model");
const fs = require("node:fs");

module.exports.addProduct = async (req, res) => {
    try{
        if(!req.auth.userId){
            return res.status(401).json({message: "non autorisé"})
        }
        if(!req.imageUrls[0]){
            return res.status(400).json({message : "images not found "})
        }
        const { title, description, price,  quantity} = req.body;
        const product = new Product({
            userId: req.auth.userId,
            title,
            description,
            price,
            quantity,
            images : req.imageUrls
        });
        await  product.save();
        return res.status(200).json({ error: false, message: "Product added successfully." });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: "Internal Server Error" });
    }
}

module.exports.updateProduct = async (req, res) => {
    try{

        const product = await Product.findOne({ _id: req.params.productId });
        if(product.userId !== req.auth.userId){
            return res.status(401).json({ error: true, message: "non autorisé"})
        }
        const images = [];
        for (const imageUrl of req.imageUrls) {
            if(!product.images.includes(imageUrl.hash)){
                images.push(imageUrl);
            }
        }
        await Product.updateOne({_id: req.params.productId}, {...req.body, images: images});
        res.status(200).json({error: false, message: "Product updated successfully." });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
module.exports.deleteProduct =  (req, res) => {
    Product.findOne({_id: req.params.productId})
        .then(product => {
            if (product.userId !== req.auth.userId){
                res.status(401).json({message: "non autorisé"})
            }
            else {
                const filenames = product.images.map((image) => image.split("/images")[1]);
                for (const filename of filenames){
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) { res.status(200).json({})
                            console.log(err);
                        }
                        else{
                            Product.deleteOne({_id: req.params.productId})
                                .then(() => res.status(200).json({error: false, message: "Product deleted successfully."}))
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ error: true, message: "Internal Server Error" });
                                });
                        }
                    })
                }
            }
        })
}

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {$sample: { size: 10}}
        ])
        return res.status(200).json({error:false, data: products})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

module.exports.getProduct =  (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
        })
}