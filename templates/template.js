const adminNotifyTemplate = require("./admin.notify.template.js");
const passwordResetTemplate = require("./password.reset.template.js");
const verifyTemplate = require("./verify.template")


const template = {
    verify: verifyTemplate,
    reset: passwordResetTemplate,
    notify: adminNotifyTemplate,
}

module.exports = template