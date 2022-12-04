const GigModel = require("../../models/gigModel");



const singleListing = async (req, res) => {
    try {
        const gigId = req.params.gigId || req.params.id

        const gig = await GigModel.findById({
            _id: gigId
        });

        if (!gig) {
            return res.status(404).send({
                message: `Gig wirh id ${gigId} not found`
            })
        }

        return res.send({
            message: "Gig fetched successfully",
            data: gig
        })


    } catch (error) {
        return res.status(500).send({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = singleListing