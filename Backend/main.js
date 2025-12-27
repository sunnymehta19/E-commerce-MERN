const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000

require("dotenv").config();
const database = require("./config/mongooseConnection");

const authRouter = require("./routes/auth/authRouter");

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



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})



