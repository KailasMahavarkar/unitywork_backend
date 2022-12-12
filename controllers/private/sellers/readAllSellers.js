const UserModel = require('../../../models/userModel');

const readAllSellers = async (req, res) => {
    try {

        // get all sellers with at least one gig
        // and gig status is active
        const sellers = await UserModel.find({
            gigs: {
                $exists: true, $not: { $size: 0 },
            },
        }, {
            username: 1,
            firstname: 1,
            lastname: 1,
            email: 1,
            country: 1,
            gigs: 1,
            avatar: 1,
            about: 1,
            sellerId: 1,
            socials: 1
        })



        if (!sellers) {
            return res.status(404).json({
                message: "Sellers not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Sellers found",
            status: "success",
            data: sellers
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            status: "failed"
        })
    }
}

module.exports = readAllSellers;