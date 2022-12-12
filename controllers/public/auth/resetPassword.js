const UserModel = require("../../../models/userModel");
const { randomToken, runDev, showError, withMode } = require("../../../helper");
const bindTemplate = require("../../../template.bind");
const sendEmail = require("../../../mailer");


const sendPasswordOTP = async (token, email) => {
    // bind email template
    const bindedTemplate = await bindTemplate("reset", {
        company: "unitywork.io",
        href: withMode({
            dev: `http://localhost:3000/reset-password?token=${token}`,
            prod: `https://unitywork.io/reset-password?token=${token}`,
        }),
    });


    // send email to user
    return await sendEmail({
        senderEmail: "no-reply@unitywork.io",
        appname: "unitywork.io",
        html: bindedTemplate.template,
        subject: "unity work, OTP for password reset",
        receiverEmails: [
            {
                email: email,
            },
        ],
        plaintext: bindedTemplate.plaintext,
    });
};

const resetPassword = async (req, res) => {
    const email = req.body.email;

    const token = req.body.token;
    const password = req.body.password;

    if (token && password) {
        try {
            const user
                = await UserModel.findOne({
                    resetToken: token,
                });

            if (!user?._id) {
                return res.status(400).send({
                    msg: "invalid token",
                    status: "failed",
                });
            }

            // update password
            user.password = password;

            // remove token
            user.resetToken = null;

            // save user
            await user.save();

            return res.status(200).send({
                msg: "password updated",
                status: "success",
            });
        } catch (error) {
            return res.status(500).send({
                msg: "error updating password",
                status: "exited",
                error: showError(error),
            });
        }
    }

    // generate a random password
    const resetToken = randomToken();


    try {
        const user = await UserModel.findOne({
            email: email
        }, {
            email: 1
        });

        if (!user?._id) {
            return res.status(400).send({
                msg: "email does not exists in database",
                status: "failed",
            });
        }

        // attach random password to user
        user.resetToken = resetToken;

        // save user
        await user.save();

        // send email to user
        await sendPasswordOTP(resetToken, email);

        return res.status(200).send({
            msg: "Verification mail sent",
            status: "success",
            dev: runDev({
                token: resetToken,
            })
        });

    } catch (error) {
        return res.status(500).send({
            msg: "error registering user",
            status: "exited",
            error: showError(error),
        });
    }
};


// module.exports = userRegister;
module.exports = resetPassword;