const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../../controllers/admin/dashboardController");
const { authMiddleware } = require("../../controllers/auth/authController");

router.get("/dashboard-stats", authMiddleware, getDashboardStats);

module.exports = router;
