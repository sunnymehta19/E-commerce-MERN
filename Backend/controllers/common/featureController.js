const featureModel = require("../../models/feature");

const addFeatureImage = async (req, res) => {
    try {

        const { image } = req.body;

        const featureImage = new featureModel({
            image,
        });

        await featureImage.save();

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            data: featureImage,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured while adding feature image"
        });
    }
}


const getFeatureImage = async (req, res) => {
    try {

        const images = await featureModel.find({});

        res.status(200).json({
            success: true,
            data: images,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured while getting feature image"
        });
    }
}


const deleteFeatureImage = async (req, res) => {
    try {
        const { id } = req.params;

        const newData = await featureModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Feature image deleted successfully",
            data: newData,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured while deleting feature image"
        });
    }
};

module.exports = { addFeatureImage, getFeatureImage, deleteFeatureImage };
