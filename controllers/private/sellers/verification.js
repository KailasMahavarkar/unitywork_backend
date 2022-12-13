const UserModel = require("../../../models/userModel");
const authAJV = require('../../ajvHelper');

const createVerification = async (req, res) => {
    const isValid = authAJV.verificationAJV.create(req.body);

    if (!isValid) {
        return authAJV.handleAJVError(res)
    }

    // get seller if from authToken
    const tokenData = res.locals.tokenData
    const sellerId = tokenData._id;

    const {
        firstname, lastname,
        description,
        email, country,
        govtIdCardSecureUrl, govtIdCardPublicId,
        selfieGovtIdCardSecureUrl, selfieGovtIdCardPublicId
    } = req.body;


    // check if seller already has a verification
    const seller = await UserModel.findOne({
        _id: sellerId
    }, {
        verification: 1
    })


    if (seller.verification.verificationStatus === 'pending') {
        return res.status(400).json({
            message: "Seller already request verification",
            status: "failed"
        })
    }


    try {
        const verification = {
            firstname,
            lastname,
            email,
            description,
            country,

            // id card
            govtIdCardSecureUrl,
            govtIdCardPublicId,
            selfieGovtIdCardSecureUrl,
            selfieGovtIdCardPublicId,

            verificationStatus: "pending"
        }

        // find seller and update verification
        const updateResult = await UserModel.findOneAndUpdate({
            _id: sellerId
        }, {
            $set: {
                verification
            }
        }, {
            new: true
        })

        if (!updateResult) {
            return res.status(404).json({
                message: "Seller not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Verification created successfully",
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

const getVerification = async (req, res) => {
    const sellerId = res.locals.tokenData._id;

    console.log("seller -->",sellerId)

    try {
        const verification = await UserModel.findOne({
            _id: sellerId
        }, {
            verification: 1
        })

        if (!verification._id) {
            return res.status(404).json({
                message: "seller not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Verification found",
            status: "success",
            data: verification
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            status: "failed"
        })
    }
}

const getAllVerifications = async (req, res) => {
    const tokenData = res.locals.tokenData
    const sellerId = tokenData._id;

    try {
        const findResult = await UserModel.find({
            sellerId,
            "verification.verificationStatus": "pending"
        })

        if (!findResult) {
            return res.status(404).json({
                message: "Verification not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Verification found",
            status: "success",
            data: findResult
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            status: "exited"
        })
    }
}


const changeVerificationStatus = async (req, res) => {


    const sellerId = res.locals.tokenData._id;
    const status = req.body.status;

    try {
        const updateResult = await UserModel.findOneAndUpdate({
            _id: sellerId
        },
            {
                $set: {
                    "verification.verificationStatus": status
                }
            }
        )

        if (!updateResult) {
            return res.status(404).json({
                message: "user not found",
                status: "failed"
            })
        }


        return res.status(200).json({
            message: "Verification status changed",
            status: "success",
            data: {
                newStatus: status
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            status: "exited"
        })
    }
}

module.exports = {
    createVerification,
    getVerification,
    getAllVerifications,
    changeVerificationStatus
}