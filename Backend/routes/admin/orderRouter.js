const express = require("express");
const router = express.Router();
const { getAllOrdersByAllUser, getOrderDetailsByAdmin, updateOrderStatus } = require("../../controllers/admin/orderController");


router.get("/get", getAllOrdersByAllUser);
router.get("/details/:id", getOrderDetailsByAdmin);
router.put("/update/:id" ,updateOrderStatus);


module.exports = router;
