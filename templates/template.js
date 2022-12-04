import adminNotifyTemplate from "./admin.notify.template.mjs";
import passwordResetTemplate from "./password.reset.template.mjs";
import verifyTemplate from "./verify.template"

const template = {
    // verify template
    verify: verifyTemplate,
    // admin notify template
    passwordReset: passwordResetTemplate,
    // admin notify template
    adminNotify: adminNotifyTemplate,
}

export default template;