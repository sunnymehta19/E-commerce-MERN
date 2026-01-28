const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000

require("dotenv").config();
const database = require("./config/mongooseConnection");

const authRouter = require("./routes/auth/authRouter");
const adminProductRouter = require("./routes/admin/productRouter");
const adminOrderRouter = require("./routes/admin/orderRouter");

const shopProductRouter = require("./routes/shop/productRouter");
const shopCartRouter = require("./routes/shop/cartRouter");
const shopAddressRouter = require("./routes/shop/addressRouter");
const shopOrderRouter = require("./routes/shop/orderRouter");
const shopSearchRouter = require("./routes/shop/searchRouter");
const shopReviewRouter = require("./routes/shop/reviewRouter");

const commonFeatureRouter = require("./routes/common/featureRouter");

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
)

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})



