const addressModel = require("../../models/address");

const addAddress = async (req, res) => {
    try {

        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const newAddress = await addressModel({
            userId,
            address,
            city,
            pincode,
            phone,
            notes: notes || "",
        });

        await newAddress.save();

        res.status(200).json({
            success: true,
            data: newAddress,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while adding address."
        });
    }
}


const fetchAddress = async (req, res) => {
    try {

        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required!",
            });
        }

        const addressList = await addressModel.find({ userId });
        res.status(200).json({
            success: true,
            data: addressList,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while fetching address."
        });
    }
}


const editAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and address id is required!",
            });
        }

        const address = await addressModel.findOneAndUpdate({
            _id: addressId,
            userId,
        },
            formData, { new: true }
        )

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: address,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while editing address."
        });
    }
}


const deleteAddress = async (req, res) => {
    try {

        const {userId, addressId} = req.params;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and address id is required!",
            });
        }

        const deletedAddress = await addressModel.findOneAndDelete({ _id: addressId, userId});

        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while deleting address."
        });
    }
}


module.exports = { addAddress, fetchAddress, editAddress, deleteAddress };
