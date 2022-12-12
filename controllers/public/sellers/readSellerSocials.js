const UserModel = require('../../../models/userModel');

const readSellerSocials = async (req, res) => {
    const username = req.params.username;

    if (!username) {
        return res.status(400).json({
            message: "username is not provided",
            status: "failed"
        })
    }

    try {
        const fetchResult = await UserModel.findOne(
            {
                username: username
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
        console.log(error)
        return res.status(500).json({
            msg: "Some error occurred while updating the socials.",
            status: "exited"
        })
    }
}

module.exports = readSellerSocials;