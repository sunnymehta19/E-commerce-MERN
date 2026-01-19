const express = require("express");
const router = express.Router();
const { getFilteredProducts } = require("../../controllers/shop/productController");

router.get("/get", getFilteredProducts);

module.exports = router;