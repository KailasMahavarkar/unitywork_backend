const UserModel = require("../../../models/userModel");
const GigModel = require("../../../models/gigModel");

const readSeller = async (req, res) => {

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

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: "failed"
            })
        }

        // get all gigs of the user
        const userGigs = user.gigs;

        // result of the gig find query
        const gigFindResult = await GigModel.find({
            _id: {
                $in: userGigs
            }
        })

        return res.status(200).json({
            status: "success",
            message: "user fetched successfully",
            data: {
                user: user,
                gigs: gigFindResult
            }
        })
    } catch (error) {

        return res.status(500).send({
            message: "Seller Gig read exited with error",
            error: error.message,
            status: "exited"
        })
    }


}


module.exports = readSeller