const express = require("express");
const router = express.Router();
const { getAllOrdersByAllUser, getOrderDetailsByAdmin } = require("../../controllers/admin/orderController");


router.get("/get", getAllOrdersByAllUser);
router.get("/details/:id", getOrderDetailsByAdmin);



module.exports = router;
