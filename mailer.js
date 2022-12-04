const SibApiV3Sdk = require('sib-api-v3-sdk');
const env = require('./env');

// expected emailTYPE
// {
// 	senderEmail: string;
// 	appname: string;
// 	html: string;
// 	subject: string;
// 	receiverEmails: { email: string }[];
// 	plaintext: string;
// 	triggers?: {
// 		beforeEmail?: () => void;
// 		afterEmail?: () => void;
// 	};
// };

const SibApiKey = env.SIB_APIKEY;
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = SibApiKey;

async function sendEmail(config) {
    if (!SibApiKey) {
        throw new Error("Sib Api Key is not defined");
    }

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
        sender: {
            email: config.senderEmail,
            name: "Pastekey.io"
        },
        to: config.receiverEmails,
        subject: config.subject,
        htmlContent: config.html,
    };

    try {
        if (config.triggers && config.triggers.beforeEmail) {
            config.triggers.beforeEmail();
        }
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        if (config.triggers && config.triggers.afterEmail) {
            config.triggers.afterEmail();
        }
        return {
            msg: "mail has been processed",
            data: result.messageId,
            status: "success",
        };
    } catch (error) {
        return {
            msg: "mail sending failed",
            status: "failed",
            data: {},
        };
    }
}

module.exports = sendEmail;
