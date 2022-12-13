const GigModel = require("../../../models/gigModel");
const { gigAJV, handleAJVError } = require("../../ajvHelper");
const UserModel = require("../../../models/userModel");

const updateGIG = async (req, res) => {

    const gigId = req.params.gigId || req.body.gigId;
    const tokenData = res.locals.tokenData
    const sellerId = tokenData._id;

    if (!gigAJV.gigCreate(req.body)) {
        return handleAJVError(res);
    }

    // get sellerId, sellerName, sellerAvatar, sellerCountry from userModel
    const user = await UserModel.findOne(
        {
            _id: sellerId
        },
        {
            _id: 1,
            username: 1,
            country: 1
        }
    )


    const gig = await GigModel.findByIdAndUpdate(gigId, {
        ...req.body,
        sellerId: sellerId,
        sellerUsername: user.username,
        sellerCountry: user.country,
    }, {
        new: true
    })

    try {

        if (!gig) {
            return res.status(404).json({
                message: `Gig with id ${gigId} is not found`,
                status: "failed"
            })
        }

        return res.status(200).json({
            message: `Gig with id ${gigId} is updated`,
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
