const adminNotifyTemplate = require("./admin.notify.template.js");
const passwordResetTemplate = require("./password.reset.template.js");
const verifyTemplate = require("./verify.template")


const template = {
    // verify template
    verify: verifyTemplate,
    // admin notify template
    passwordReset: passwordResetTemplate,
    // admin notify template
    adminNotify: adminNotifyTemplate,
}

module.exports = template