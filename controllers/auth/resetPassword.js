import UserModel from "../../models/userModel";
import { isEmpty, randomToken, runDev, showError, withMode } from "../../helper";
import bindTemplate from "../../template.bind";
import sendEmail from "../../mailer";
import env from "../../env";


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
        subject: "unity work, OTP for password reset",
        receiverEmails: [
            {
                email: email,
            },
        ],
        plaintext: bindedTemplate.plaintext,
    });
};

const userRegister = async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;


    try {
        const user = await UserModel.exists({
            username: username,
            email: email
        });
        if (!isEmpty(usernameMatch)) {
            return res.status(400).send({
                status: "failed",
                msg: "Username already exists",
            });
        }

        // send mail
        if (env.EMAIL_MODE === "prod") {
            await sendVerificationMail(token, email);
        }

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

export default userRegister;

