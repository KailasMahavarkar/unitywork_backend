const GigModel = require('../../../models/gigModel')

const createGigVerification = async (req, res) => {
    const { gigId } = req.params;

    try {

        // check if gig already has a verification
        const gig = await GigModel.findOne({
            _id: gigId
        }, {
            verification: 1
        })

        if (!gig) {
            return res.status(404).json({
                message: "Gig not found",
                status: "failed"
            })
        }

        const getVerification = (status) => {
            if (status === "verified") return "Gig Already Verified"
            if (status === "pending") return "Gig Already Sent for Verification"
            if (status === "rejected") return "Gig Rejected by Admin"
            return "pending";
        }

        if (gig.verification !== "created") {
            return res.status(400).json({
                message: getVerification(gig.verification),
                status: "failed"
            })
        }


        const result = await gig.updateOne({
            $set: {
                verification: "pending"
            }
        })

        return res.status(200).json({
            message: "Gig sent for verification",
            status: "success",
            data: result
        })

    }
    catch (error) {
        return res.status(500).json({
            message: "Gig Verification error",
            status: "exited"
        })
    }
}

const updateGigVerification = async (req, res) => {
    const { gigId } = req.params;
    const { status } = req.body;

    try {
        const gig = await GigModel.findOneAndUpdate({
            _id: gigId
        }, {
            $set: {
                verification: status
            }
        })

        if (!gig) {
            return res.status(404).json({
                message: "Gig not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Gig verification status updated",
            status: "success",
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Gig Verification error",
            status: "exited"
        })
    }
}

const getGigVerification = async (req, res) => {
    const { gigId } = req.params;

    try {
        const gig = await GigModel.findOne({
            _id: gigId
        })

        if (!gig) {
            return res.status(404).json({
                message: "Gig not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Gig verification status",
            status: "success",
            data: {
                verification: gig.verification
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: "Gig Verification error",
            status: "exited"
        })
    }


}

const getAllGigVerifications = async (req, res) => {

    // find all gigs with verification status pending
    try {
        const gigs = await GigModel.find({
            verification: "pending"
        })

        if (!gigs) {
            return res.status(404).json({
                message: "Gig not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Gig verification status",
            status: "success",
            data: {
                gigs
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Gig Verification error",
            status: "exited"
        })
    }

}

module.exports = {
    getGigVerification,
    updateGigVerification,
    createGigVerification,
    getAllGigVerifications
}