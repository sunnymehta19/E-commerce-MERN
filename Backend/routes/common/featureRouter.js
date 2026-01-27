const express = require("express");
const router = express.Router();
const { addFeatureImage, getFeatureImage, deleteFeatureImage } = require("../../controllers/common/featureController");

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImage);
router.delete("/delete/:id", deleteFeatureImage);

module.exports = router;
