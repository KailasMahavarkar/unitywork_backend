const cloudinary = require('../../../cloudinary');

const deleteImageCloudinary = async (req, res) => {
    const imageId = req.query.publicId || req.body.publicId;

    if (!imageId) {
        return res.status(400).json({
            msg: "Image URL is required",
            success: "failed"
        })
    }

    try {
        const deleteResult = await cloudinary.uploader.destroy(imageId)

        if (deleteResult.result === 'ok') {
            return res.status(200).json({
                msg: "Image Deleted Successfully",
                status: "success",
            })
        }


        // image not deleted
        return res.status(400).json({
            msg: "Image Not Deleted",
            status: "failed",
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Cloudinary Error Deleting Image",
            status: "exited",
            error: "SE_M_SINGLE_FILE_DELETE_01",
        })
    }
}

module.exports = deleteImageCloudinary;