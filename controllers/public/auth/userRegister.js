
const UserModel = require("../../../models/userModel");
const { randomToken, runDev, showError, withMode } = require("../../../helper");
const TempUserModel = require("../../../models/tempUserModel");
const bindTemplate = require("../../../template.bind");
const sendEmail = require("../../../mailer");
const { authAJV, handleAJVError } = require("../../ajvHelper");


const MAIL_OTP_EXPIRY_IN_MINS = 5;
const USER_BAN_TIME_IN_MINS = 20;


const sendVerificationMail = async (token, email) => {
    // bind email template
    const bindedTemplate = await bindTemplate("verify", {
        company: "unitywork.io",
        href: withMode({
            dev: `http://localhost:3000/register?mailtoken=${token}`,
            prod: `https://unitywork.io/register?mailtoken=${token}`,
        }),
    });


    // send email to user
    return await sendEmail({
        senderEmail: "no-reply@unitywork.io",
        appname: "unitywork.io",
        html: bindedTemplate.template,
        subject: "Verify your email",
        receiverEmails: [
            {
                email: email,
            },
        ],
        plaintext: bindedTemplate.plaintext,
    });
};

const userRegister = async (req, res) => {
    const body = req.body;

    // schema check for register route
    if (!authAJV.register(body)) {
        return handleAJVError(res);
    }


    const username = body.username;
    const email = body.email;
    let password = body.password || "";
    const firstname = body.firstname;
    const lastname = body.lastname;


    try {
        // check if user exists
        const user = await UserModel.findOne({
            $or: [
                {
                    username: username
                },
                {
                    email: email
                }
            ]
        });


        if (user?._id) {
            return res.status(400).send({
                status: "failed",
                msg: "Username or Email already exists",
            });
        }

        const token = randomToken();
        const findResult = await TempUserModel.findOne({
            email: email,
        });

        // if findResult is empty ? create new temp user : continue
        if (!findResult) {

            const saveObject = {
                email: email,
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                token: token,
                attempts: 1,
                createTS: Date.now(),
                expireTS: Date.now() + 60 * 1000 * MAIL_OTP_EXPIRY_IN_MINS,
            }

            const tempuser = new TempUserModel(saveObject);
            await tempuser.save();

        } else {
            // handle user ban
            if (findResult.status === "banned") {
                // if user is banned and time is less than MAIL_OTP_EXPIRY_IN_MINS
                if (Date.now() < findResult.expireTS) {
                    return res.status(400).send({
                        msg: `Request exceeded, registration paused for ${USER_BAN_TIME_IN_MINS} minutes`,
                        status: "failed",
                        data: {
                            // time left in seconds
                            timeLeftInSeconds: Math.floor(
                                (findResult.expireTS - Date.now()) / 1000
                            ),
                        },
                        dev: {
                            token: findResult.token
                        }
                    });
                } else {
                    // un-ban user
                    findResult.status = "pending";
                    findResult.attempts = 1;
                    findResult.expireTS =
                        Date.now() + 60 * 1000 * MAIL_OTP_EXPIRY_IN_MINS;
                    await findResult.save();
                }
            } else if (findResult.status === "pending") {
                // if attempts is greater than 3 ? ban user for 30 minutes : continue
                if (findResult.attempts >= 3) {
                    findResult.status = "banned";
                    findResult.expireTS =
                        Date.now() + 60 * 1000 * USER_BAN_TIME_IN_MINS;
                    findResult.attempts = 0;
                    await findResult.save();
                    return res.status(400).send({
                        msg: `You have exceeded the limit of attempts. Please try again after ${MAIL_OTP_EXPIRY_IN_MINS} minutes`,
                        status: "failed",
                    });
                } else {
                    findResult.attempts++;
                    findResult.token = token;
                    await findResult.save();
                }
            } else if (findResult.status === "expired") {
                return res.status(400).send({
                    msg: "Your verification link has expired. Please try again",
                    status: "failed",
                });
            }
        }

        // send mail
        await sendVerificationMail(token, email);

        return res.status(200).send({
            msg: "Verification mail sent",
            status: "success",
            dev: runDev({
                token: token,
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


module.exports = userRegister;

