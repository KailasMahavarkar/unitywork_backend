// This route handles the control of a gig
// controls:
// 1. change gig status
// 2. change gig delivery time
// 3. change gig delivery method

const GigModel = require("../../../models/gigModel");

const changeGigStatus = async (req, res) => {

    // get gig id from params
    const gigId = req.params.gigId || req.body.gigId;

    if (!gigId) {
        return res.status(400).json({
            message: "gig id is required",
            status: "failed"
        })
    }

    const gig = await GigModel.findById({
        _id: gigId,

    }, {
        status: 1
    })

    if (!gig) {
        return res.status(400).json({
            message: "gig not found",
            status: "failed"
        })
    }


    try {
        const updateResult = await GigModel.findByIdAndUpdate(gigId,
            {
                status: gig.status === 'active' ? 'inactive' : 'active'
            },
            {
                new: true
            }
        )

        if (updateResult) {
            return res.status(200).json({
                message: "gig status updated successfully",
                status: "success"
            })
        }

        return res.status(400).json({
            message: "gig status not updated",
            status: "failed"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Some error occurred while updating the gig status.",
            status: "error"
        })
    }
}

module.exports = changeGigStatus;