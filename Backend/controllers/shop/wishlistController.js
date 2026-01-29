const wishlistModel = require("../../models/wishlist");

const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let wishlist = await wishlistModel.findOne({ userId });

        if (!wishlist) {
            wishlist = new wishlistModel({
                userId,
                items: [{ productId }],
            });
        } else {
            const alreadyExists = wishlist.items.find(
                (item) => item.productId.toString() === productId
            );

            if (alreadyExists) {
                return res.status(200).json({
                    success: true,
                    message: "Product already in wishlist",
                });
            }

            wishlist.items.push({ productId });
        }

        await wishlist.save();

        res.status(200).json({
            success: true,
            data: wishlist
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured while adding to wishlist"
        });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const wishlist = await wishlistModel.findOne({ userId }).populate("items.productId");

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "wishlist not found"
            });
        }

        wishlist.items = wishlist.items.filter(
            (item) => item.productId._id.toString() !== productId
        );

        await wishlist.save();

        res.status(200).json({
            success: true,
            data: wishlist
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured while removing from wishlist"
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishlist = await wishlistModel.findOne({ userId }).populate("items.productId");

        res.status(200).json({
            success: true,
            data: wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured while getting from wishlist"
        });
    }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
