const cartModel = require("../../models/cart");
const productModel = require("../../models/product");

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!"
            });
        }
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();
        res.status(200).json({
            success: true,
            data: cart,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while adding product to cart."
        });
    }
}

const mongoose = require("mongoose");
const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "User id is mandatory!"
            });
        }

        const cart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "cart not found!",
            });
        }

        const validItems = cart.items.filter((productItem) => productItem.productId);

        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const popolateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,

        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: popolateCartItems,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while fetching product in the cart."
        });
    }
}


const updateCartItems = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!"
            });
        }

        const cart = await cartModel.findOne({ userId })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "cart not found!",
            });
        }

        const findCurrentProductIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });


        const popolateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,

        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: popolateCartItems,
            }
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while updating product quantity."
        });
    }
}


const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!"
            });
        }

        const cart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!"
            });
        }

        cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId);

        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,

        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while deleting cart items."
        })
    }
}

module.exports = { addToCart, fetchCartItems, updateCartItems, deleteCartItem };