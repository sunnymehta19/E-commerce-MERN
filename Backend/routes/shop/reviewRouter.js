const express = require("express");
const router = express.Router();
const {addProductReview, getProductReview} = require("../../controllers/shop/productReviewController");

router.post("/add", addProductReview);
router.get("/:productId", getProductReview);

module.exports = router;
