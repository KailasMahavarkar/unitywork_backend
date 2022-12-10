const uploadImageCloudinary = (req, res) => {
    if (typeof req.singleImage.secure_url === 'string') {
        return res.status(200).json({
            message: "image uploaded successfully",
            status: "success",
            data: {
                secureUrl: req.singleImage.secure_url,
                publicId: req.singleImage.public_id,
            }
        });
    }
    return res.status(400).json({
        msg: "insert image error"
    });
}

module.exports = uploadImageCloudinary;