const GigModel = require("../../../models/gigModel");
const UserModel = require("../../../models/userModel");
const { gigAJV, handleAJVError } = require("../../ajvHelper");

const createGig = async (req, res) => {

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



    // create gig
    const gig = new GigModel({
        ...req.body,
        sellerId: sellerId,
        sellerUsername: user.username,
        sellerCountry: user.country,
        status: 'active',
    });


    // add gig to seller gigs
    await UserModel.findOneAndUpdate(
        {
            _id: sellerId
        },
        {
            $push: {
                gigs: gig._id
            }
        }
    )

    try {
        const savedGig = await gig.save();
        res.status(200).json({
            message: "Gig created successfully",
            data: savedGig
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while creating the Gig.",
            status: "error"
        })
    }

}

module.exports = createGig;
