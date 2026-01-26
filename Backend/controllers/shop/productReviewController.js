const orderModel = require("../../models/order");
const productModel = require("../../models/product");
const productReviewModel = require("../../models/review");


const addProductReview = async (req, res) => {
    try {

        const { productId, userId, username, reviewMessage, reviewValue } = req.body;

        const order = await orderModel.findOne({
            userId,
            "cartItems.productId": productId,
        });

        if (!order) {
            return res.status(403).json({
                success: false,
                message: "Sorry! You are not allowed to review this product since you haven't bought it."
            });
        }

        const checkExistingReview = await productReviewModel.findOne({
            productId,
            userId,
        });

        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product!",
            });
        }

        const newReview = new productReviewModel({
            productId,
            userId,
            username,
            reviewMessage,
            reviewValue,
        });

        await newReview.save();

        const reviews = await productReviewModel.find({ productId });
        const totalReviewLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem) => Number(sum + reviewItem.reviewValue || 0), 0) / totalReviewLength;

        await productModel.findByIdAndUpdate(productId, { averageReview });

        res.status(201).json({
            success: true,
            data: newReview,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while adding review"
        })

    }
}


const getProductReview = async (req, res) => {
    try {

        const { productId } = req.params;

        const reviews = await productReviewModel.find({ productId });

        res.status(200).json({
            success: true,
            data: reviews,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while getting review"
        })

    }
}


module.exports = { addProductReview, getProductReview };