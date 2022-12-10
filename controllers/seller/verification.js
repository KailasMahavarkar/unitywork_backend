const VerificationModel = require("../../models/verificationModel");
const authAJV = require('../ajvHelper');

const createVerification = async (req, res) => {

    const isValid = authAJV.verificationAJV.create(req.body);

    if (!isValid) {
        return authAJV.handleAJVError(res)
    }

    const tokenData = res.locals.tokenData
    const sellerId = tokenData._id;

    const {
        firstname, lastname, about, email, govtIssuedId, selfieGovtIssuedId, country
    } = req.body;

    try {
        const newUser = await VerificationModel.create({
            firstname, lastname, about, email, govtIssuedId, selfieGovtIssuedId, country, sellerId
        })

        // save
        await newUser.save();


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
    const verificationId = req.body.verificationId;

    try {
        const verification = await VerificationModel.findOne({
            _id: verificationId
        })

        if (!verification) {
            return res.status(404).json({
                message: "Verification not found",
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
        const verifications = await VerificationModel.find({
            sellerId
        })

        if (!verifications) {
            return res.status(404).json({
                message: "Verification not found",
                status: "failed"
            })
        }

        return res.status(200).json({
            message: "Verification found",
            status: "success",
            data: verifications
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
    const verificationId = req.body.verificationId;
    const status = req.body.status;

    try {
        const verification = await VerificationModel.findOne({
            _id: verificationId
        })

        if (!verification) {
            return res.status(404).json({
                message: "Verification not found",
                status: "failed"
            })
        }

        switch (status) {
            case "approved":
                verification.status = "approved"
                break;
            case "rejected":
                verification.status = "rejected"
                break;
        }

        await verification.save();

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