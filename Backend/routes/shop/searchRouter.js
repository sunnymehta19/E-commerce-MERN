const express = require("express");
const router = express.Router();
const { searchProducts } = require("../../controllers/shop/searchController");

router.get("/:keyword", searchProducts);

module.exports = router;
