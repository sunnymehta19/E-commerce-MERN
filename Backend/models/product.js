const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    sizeType: {
        type: String,
        enum: ["upper", "lower", "footwear", "none"],
        default: "none",
    },
    sizes: {
        type: [String],
        default: [],
    },
    averageReview: Number,
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

module.exports = mongoose.model("product", productSchema);