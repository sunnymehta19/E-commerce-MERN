const express = require("express");
const router = express.Router();
const { createOrder, captureOrder, getAllOrdersByUser, getOrderDetails} = require("../../controllers/shop/orderController")

router.post("/create", createOrder);
router.post("/capture-payment", captureOrder);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
