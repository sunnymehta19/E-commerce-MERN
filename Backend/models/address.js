const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: {
        type: String,
        default: ""
    },

}, { timestamps: true });

module.exports = mongoose.model("address", addressSchema);