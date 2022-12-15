const UserModel = require('../../../models/userModel');
const { profileAJV, handleAJVError } = require('../../ajvHelper');


const updateSellerProfile = async (req, res) => {

    if (!profileAJV.update(req.body)) {
        return handleAJVError(res);
    }

    const sellerId = res.locals.tokenData._id;

    const newData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        job: req.body.job,
        education: req.body.education,
        description: req.body.description,
        location: req.body.location,
        avatar: req.body.avatar
    }

    try {
        const updateResult = await UserModel.findOneAndUpdate(
            {
                _id: sellerId
            },
            newData
        )

        if (!updateResult) {
            return res.status(404).json({
                message: "Seller not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Seller profile updated successfully",
            status: "success"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            status: "failed"
        })
    }

}


const readSellerProfile = async (req, res) => {
    const username = req.params.username;

    if (!username) {
        return res.status(400).json({
            message: "Username is required",
            status: "failed"
        })
    }

    try {
        const seller = await UserModel.findOne({
            username
        }, {
            firstname: 1,
            lastname: 1,
            description: 1,
            job: 1,
            education: 1,
            location: 1,
            email: 1,
            country: 1,
            username: 1,
            avatar: 1,
            verified: 1,
            socials: 1
        })

        if (!seller) {
            return res.status(404).json({
                message: "Seller not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Seller profile found",
            status: "success",
            data: seller
        })



    } catch (error) {
        return res.status(500).json({
            message: "failed to get seller profile (exited)",
            error: error.message,
            status: "exited"
        })
    }

}

module.exports = {
    updateSellerProfile,
    readSellerProfile
}