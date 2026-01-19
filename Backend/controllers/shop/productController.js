const productModel = require("../../models/product");

const getFilteredProducts = async (req, res) => {
    try {
        const product = await productModel.find({});

        res.status(200).json({
            success: true,
            data: product,  
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while product filtering."
        })
    }
}

module.exports = { getFilteredProducts }
