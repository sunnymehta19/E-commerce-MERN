const { imageUploadUtil } = require("../../helpers/cloudinary");
const productModel = require("../../models/product");


//Handling image upload
const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured while uploading image"
        });
    }
}


//Adding a product
const addProduct = async (req, res) => {
    try {
        const { image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            sizes
        } = req.body;

        const createdProduct = new productModel({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            sizes: sizes || [],
        });

        await createdProduct.save();
        res.status(201).json({
            success: true,
            data: createdProduct,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured while adding a product"
        });
    }
}


//Fetching all product
const fetchAllProduct = async (req, res) => {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json({
            success: true,
            data: allProducts,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured while fetching all product"
        });
    }
}


//Edit a product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            sizes,
        } = req.body;

        let findProduct = await productModel.findById(id);

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        };

        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        if (Array.isArray(sizes)) {
            findProduct.sizes = sizes;
        }


        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured while editing a product"
        });
    }
}


//Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndDelete(id);

        if (!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        });

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured while deleting a product"
        });
    }
}



module.exports = { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct };
