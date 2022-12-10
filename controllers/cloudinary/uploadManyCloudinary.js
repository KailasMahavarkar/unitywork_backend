const uploadManyCloudinary = (req, res) => {
    if (req.multipleImages) {
        return res.status(200).json({
            message: "image uploaded successfully",
            status: "success",
            data: req.multipleImages
        });
    }
    return res.status(400).json({
        msg: "insert image error"
    });
}

module.exports = uploadManyCloudinary;