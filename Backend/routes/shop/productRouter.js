const express = require("express");
const router = express.Router();
const { getFilteredProducts, getProductDetails, getFeaturedProducts } = require("../../controllers/shop/productController");

router.get("/get", getFilteredProducts);
router.get("/featured", getFeaturedProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;