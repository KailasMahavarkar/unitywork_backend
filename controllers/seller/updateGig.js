const { ajv, gigAJV } = require("../ajvHelper");
const GigModel = require("../../models/gigModel");

const updateGIG = async (req, res) => {


    const gigUUID = req.body.gigUUID;

    if (!gigAJV.gigUpdate()) {
        return res.send({
            message: ajv.errors[ajv.errors.length - 1].message,
            status: "failed"
        })
    }


    const gig = await GigModel.findByIdAndUpdate(gigUUID, {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        deliveryTime: req.body.deliveryTime,
        category: req.body.category,
        images: req.body.images,
        tags: req.body.tags,
        status: req.body.status
    }, {
        new: true
    })

    try {

        if (!gig) {
            return res.status(404).json({
                message: `Gig with id ${gigUUID} is not found`,
                status: "failed"
            })
        }

        return res.status(200).json({
            message: `Gig with id ${gigUUID} is updated`,
            status: "success"
        })

    } catch (error) {
        return res.send({
            message: error.message || "Some error occurred while updating the Gig.",
            status: "error"
        })
    }
}


module.exports = updateGIG;
