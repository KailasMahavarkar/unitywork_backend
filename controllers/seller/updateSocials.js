const UserModel = require('../../models/userModel');

const updateSocials = async (req, res) => {
    const tokenData = res.locals.tokenData
    const sellerId = tokenData._id;

    const socials = req.body.socials;

    try {
        const updateResult = await UserModel.findByIdAndUpdate(
            {
                _id: sellerId
            },
            {
                socials: socials
            },
            {
                new: true
            }
        )

        if (updateResult) {


            return res.status(200).json({
                message: "socials updated successfully",
                status: "success"
            })
        }
        return res.status(400).json({
            message: "socials not updated",
            status: "failed"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Some error occurred while updating the socials.",
            status: "exited"
        })
    }
}

module.exports = updateSocials;