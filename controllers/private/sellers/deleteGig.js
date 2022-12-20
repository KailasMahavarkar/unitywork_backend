// convert import to commonjs
const GigModel = require("../../../models/gigModel");
const UserModel = require("../../../models/userModel");


const deleteGIG = async (req, res) => {

    // get gigId from url
    const gigId = req.params.gigId || req.body.gigId;

    // if gigId is not provided
    if (!gigId) {
        return res.status(400).json({
            message: "Gig ID is required",
            status: "failed"
        })
    }


    try {
        const gig = await GigModel.findOne({
            _id: gigId
        })


        if (!gig) {
            return res.status(400).json({
                message: "Gig not found",
                status: "failed"
            })
        }

        const sellerName = gig.sellerUsername;


        // update gig array in user model and remove gigId from it
        const updateResult = await UserModel.findOneAndUpdate(
            {
                username: sellerName
            },
            {
                $pull: {
                    gigs: gigId
                }
            })


        if (!updateResult) {
            return res.status(400).json({
                message: "Seller not found",
                status: "failed"
            })
        }

        // delete gig
        const deleteResult = await GigModel.deleteOne({
            _id: gigId
        })


        if (deleteResult) {
            return res.status(200).json({
                message: "Gig deleted successfully",
                status: "success"
            })
        }


        return res.status(400).json({
            message: "Gig not found",
            status: "failed"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Some error occurred while deleting the Gig.",
            status: "error"
        })
    }


}

module.exports = deleteGIG;
