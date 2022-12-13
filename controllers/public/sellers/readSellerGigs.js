const UserModel = require("../../../models/userModel");
const GigModel = require("../../../models/gigModel");

const readSellerGigs = async (req, res) => {

    const username = req.params.username;

    if (!username) {
        return res.status(401).json({
            message: "username is not provided",
            status: "failed"
        })
    }

    try {
        const user = await UserModel.findOne({
            username: username
        })

        const userGigs = user.gigs;

        if (userGigs.length > 0) {
            // get gig meta from database
            const gigs = await GigModel.find({
                _id: {
                    $in: userGigs
                }
            }, {
                _id: 1,
                title: 1,
                images: 1,
                sellerId: 1,
                avatar: 1,
                gigId: 1,
                status: 1,
                deliveryTime: 1,
                category: 1,
                tags: 1,
                verificationStatus: 1
            })

            if (gigs) {
                return res.status(200).json({
                    status: "success",
                    message: "gigs fetched successfully",
                    data: gigs
                })
            }
        }



        return res.status(400).json({
            msg: "No gigs found",
            status: "failed"
        })

    } catch (error) {

        return res.status(500).send({
            message: "Seller Gig read exited with error",
            error: error.message,
            status: "exited"
        })
    }


}


module.exports = readSellerGigs