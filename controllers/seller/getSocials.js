const UserModel = require('../../models/userModel');

const getSocials = async (req, res) => {
    const tokenData = res.locals.tokenData
    const sellerId = tokenData._id;

    try {
        const fetchResult = await UserModel.findById(
            {
                _id: sellerId
            },
            {
                socials: 1
            }
        )

        return res.status(200).json({
            message: "socials fetched successfully",
            status: "success",
            data: {
                socials: fetchResult.socials
            }
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Some error occurred while updating the socials.",
            status: "exited"
        })
    }
}

module.exports = getSocials;