const express = require("express");
const router = express.Router();
const { addToCart, fetchCartItems, updateCartItems, deleteCartItem } = require("../../controllers/shop/cartController");

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItems);
router.delete("/:userId/:productId", deleteCartItem);


module.exports = router;
