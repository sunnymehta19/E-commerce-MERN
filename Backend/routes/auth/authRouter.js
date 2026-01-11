const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logOutUser, authMiddleware } = require("../../controllers/auth/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/checkauth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user
    });
});


module.exports = router;