const UserModel = require("../../models/userModel");
const { randomUUID } = require('crypto');
const TempUserModel = require('../../models/tempUserModel');

const mailVerify = async (req, res) => {
    // get token by params
    const token = req.body.token;

    // checks token -> isEmpty || invalid length || invalid type
    if (typeof token !== "string" || token.length !== 32) {
        return res.status(400).send({
            msg: "token invalid or expired",
            status: "unauthorized",
        });
    }

    try {
        const tempUser = await TempUserModel.findOne({
            token: token,
            expireTS: { $gt: Date.now() },
        });


        if (tempUser) {
            try {
                const user = new UserModel({
                    username: tempUser.username,
                    firstname: tempUser.firstname,
                    lastname: tempUser.lastname,
                    password: tempUser.password,
                    email: tempUser.email,
                    role: "member",
                    datejoined: Date.now(),
                    apikey: randomUUID().toString().replace(/-/g, ""),
                    status: "active",
                });
                await user.save();

                // cleanup after migration
                const deleteAfterMigration = await TempUserModel.deleteOne({
                    _id: tempUser._id,
                });

                if (deleteAfterMigration.deletedCount == 1) {
                    // migrate from temp collection to real collection
                    return res.status(200).send({
                        status: "success",
                        msg: "Email Verified Successfully",
                    });
                } else {
                    // if cleanup fails
                    // delete user from real collection
                    await UserModel.deleteOne({
                        _id: user._id,
                    });

                    return res.status(400).send({
                        status: "failed",
                        msg: "temp to user migration failed",
                    });
                }
            } catch (error) {
                console.log(error);

                // unable to fetch temp token from DB
                return res.status(400).send({
                    status: "failed",
                    msg: "temp to user migration failed",
                });
            }
        } else {
            // temp token is null or does not exists
            return res.status(400).send({
                status: "failed",
                msg: "mail token is Invalid",
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: "failed",
            msg: "mail verification failed",
        });
    }
};


module.exports = mailVerify;
