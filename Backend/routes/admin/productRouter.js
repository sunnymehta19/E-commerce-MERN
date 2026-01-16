const express = require("express");
const router = express.Router();

const { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct } = require("../../controllers/admin/productController");
const { upload } = require("../../helpers/cloudinary");

router.post("/upload-image", upload.single("image"), handleImageUpload);
router.post("/add", addProduct);
router.get("/fetch", fetchAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);




module.exports = router;
