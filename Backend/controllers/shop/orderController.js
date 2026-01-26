const razorpay = require("../../helpers/razorpay");
const crypto = require("crypto");
const productModel = require("../../models/product");
const orderModel = require("../../models/order");
const cartModel = require("../../models/cart");

const createOrder = async (req, res) => {
    try {

        const {
            userId,
            cartItems,
            addressInfo,
            totalAmount,
            cartId,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
        } = req.body;

        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        const newlyCreatedOrder = await orderModel({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus: "pending",
            paymentMethod: "razorpay",
            paymentStatus: "pending",
            totalAmount,
            orderDate: new Date(),

            payerId: razorpayOrder.id,
            paymentId: "",
        });

        await newlyCreatedOrder.save();

        res.status(200).json({
            success: true,
            razorpayOrder,
            orderId: newlyCreatedOrder._id,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while creating order."
        });
    }
}


const captureOrder = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId,
        } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = razorpay_payment_id;
        order.payerId = razorpay_order_id;
        order.orderUpdateDate = new Date();


        for (const item of order.cartItems) {
            const product = await productModel.findById(item.productId);

            if (!product || product.totalStock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for ${item.title}`
                });
            }
            product.totalStock -= item.quantity;
            await product.save();

        }

        await cartModel.findByIdAndDelete(order.cartId);
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order Confirmed",
            data: order,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while capturing the order."
        });
    }
}


const getAllOrdersByUser = async (req, res) => {
    try {

        const { userId } = req.params;

        const orders = await orderModel.find({ userId });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "Orders not found"
            });
        }

        res.status(200).json({
            success: true,
            data: orders,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while getting all order details."
        });
    }
};


const getOrderDetails = async (req, res) => {
    try {

        const { id } = req.params;

        const order = await orderModel.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while getting order details."
        });
    }
};



module.exports = { createOrder, captureOrder, getAllOrdersByUser, getOrderDetails };
