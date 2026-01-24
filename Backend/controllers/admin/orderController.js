const orderModel = require("../../models/order");



const getAllOrdersByAllUser = async (req, res) => {
    try {

        const orders = await orderModel.find({});

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


const getOrderDetailsByAdmin = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await orderModel.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        await orderModel.findByIdAndUpdate(id, { orderStatus }, {new: true});

        res.status(200).json({
            success: true,
            message: "Order updated successfully"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while updating order status."
        });
    }
}




module.exports = { getAllOrdersByAllUser, getOrderDetailsByAdmin, updateOrderStatus };