const UserModel = require("../../../models/userModel");
const GigModel = require("../../../models/gigModel");

const authAJV = require('../../ajvHelper');

const createSellerVerification = async (req, res) => {
    const isValid = authAJV.verificationAJV.create(req.body);

    if (!isValid) {
        return authAJV.handleAJVError(res)
    }

    const sellerId = req.params.sellerId;

    const {
        firstname, lastname,
        description,
        email, country,
        govtIdCard,
        selfieGovtIdCard,
    } = req.body;


    // check if seller already has a verification
    const seller = await UserModel.findOne({
        _id: sellerId
    }, {
        verification: 1
    })

    if (seller.verification.verificationStatus === 'verified') {
        return res.status(400).json({
            message: "Seller is already verified",
            status: "failed"
        })
    }

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
            govtIdCard,
            selfieGovtIdCard,

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

const getSellerVerification = async (req, res) => {
    const sellerId = res.locals.tokenData._id;

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

const getAllSellerVerifications = async (req, res) => {
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

const updateSellerVerification = async (req, res) => {
    const sellerId = req.params.selledId;
    const { status } = req.body;

    try {
        const updateSeller = await UserModel.findOneAndUpdate(
            {
                _id: sellerId
            },
            {
                $set: {
                    "verification.verificationStatus": status
                }
            },
            {
                new: true
            }
        )

        const gigs = updateSeller.gigs;

        // find all gigs of seller and update verification status
        const updateGigsResult = await GigModel.updateMany(
            {
                _id: {
                    $in: gigs
                }
            },
            {
                $set: {
                    verification: status
                }
            }
        )

        if (!updateGigsResult) {
            return res.status(404).json({
                message: "something went wrong while updating gigs verification status",
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
    createSellerVerification,
    getSellerVerification,
    getAllSellerVerifications,
    updateSellerVerification
}