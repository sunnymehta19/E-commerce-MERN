const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");



mongoose.connect("mongodb+srv://sunnymehta:sunnymehta19@cluster0.at9buvj.mongodb.net/")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))


app.use(
    cors({
        origin: "http://localhost:5173/",
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

app.use(cookieParser());
app.use(express.json());



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})



