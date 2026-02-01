const productModel = require("../../models/product");
const orderModel = require("../../models/order");
const userModel = require("../../models/user");

const getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await productModel.countDocuments();

        const totalUsers = await userModel.countDocuments();

        const totalOrders = await orderModel.countDocuments();

        const revenueResult = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                },
            },
        ]);

        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        const orderStatusAggregation = await orderModel.aggregate([
            {
                $group: {
                    _id: "$orderStatus",
                    count: { $sum: 1 },
                },
            },
        ]);

        const ordersByStatus = {};
        orderStatusAggregation.forEach((item) => {
            ordersByStatus[item._id || "UNKNOWN"] = item.count;
        });

        return res.status(200).json({
            success: true,
            data: {
                totalProducts,
                totalOrders,
                totalUsers,
                totalRevenue,
                ordersByStatus,
            },
        });

    } catch (error) {
        console.error("Dashboard Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard stats",
        });
    }
};

module.exports = { getDashboardStats };
