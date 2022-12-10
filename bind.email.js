const path = require("path");
const fs = require("fs");
const { isEmpty, isWindows } = require("./helper");

const templateDirectory = path.join("./templates");

const lookup = (templateName) => {
    // nodejs check file in directory4
    const filePath = path.join(templateDirectory, templateName);

    // check if file exists
    if (fs.existsSync(filePath)) {
        // return file path
        return filePath;
    }
    return "";
};

const bindEmailTemplate = async (config) => {
    // expected body
    const expected = {
        receiverEmails: {
            type: "object",
            value: config.receiverEmails,
            sample: ["john@gmail.com"],
        },
        subject: {
            type: "string",
            value: config.subject,
            sample: "Verify your email",
        },
        senderEmail: {
            type: "string",
            value: config.senderEmail,
            sample: "JohnWick",
        },
        template: {
            type: "string",
            value: config.template,
            sample: "verify",
        },
        plaintext: {
            type: "string",
            value: config.plaintext,
            sample: "some text",
        },
        config: {
            type: "object",
            value: config.config,
            sample: {},
        },
    };

    const receivedKeys = Object.keys(config);
    const expectedKeys = Object.keys(expected);
    const faultedKeys = [];
    const faultedMap = {};

    const missingConditionMap = {};
    const faultConditionMap = {};

    // check if config contains all expected keys
    for (const x of expectedKeys) {
        if (!receivedKeys.includes(x)) {
            return {
                msg: `${x} is missing`,
                status: "failed",
                data: {},

                fix: {
                    msg: `add ${x} with type ${expected[x].type}`,
                    sample: expected[x].sample || {},
                },
            };
        }

        if (typeof expected[x].value !== expected[x].type) {
            return {
                msg: `${x} is not a ${expected[x].type}`,
                status: "failed",
                data: {},
                code: 400,
            };
        }
    }

    try {
        let templateName = config.template?.replace(".template.ts", "");
        templateName = templateName + ".template.mjs";

        // check if template exists
        const lookup_filepath = lookup(templateName);

        // template not found
        if (isEmpty(lookup_filepath)) {
            return {
                code: 404,
                msg: `template ${templateName} not found`,
                status: "failed",
                data: {},
            };
        }

        const lookPath = isWindows
            ? `file:\\${lookup_filepath}`
            : lookup_filepath;

        // load template data
        const dynamic = await import(lookPath);
        const schema = dynamic["default"]["schema"];
        const template = dynamic["default"]["template"];
        const conditions = dynamic["default"]["conditions"];

        // check if conditions are met before binding template
        if (!(schema && template && conditions)) {
            return {
                msg: "template is not valid",
                status: "failed",
                data: {},
                code: 400,
            };
        }

        // loop key and value and check if key matches with expected type
        for (const key in schema) {
            if (!(typeof config.config[key] === schema[key]["type"])) {
                faultedKeys.push(key);
            }
        }

        // loop through faulted keys and add to faultedMap
        for (const x of faultedKeys) {
            faultedMap[x] = schema[x];
        }

        // if faultedMap is not empty
        if (!isEmpty(faultedMap)) {
            return {
                msg: "Invalid config",
                status: "failed",
                data: {},
                code: 400,

                fix: {
                    msg: "add missing keys",
                    config: faultedMap,
                },
            };
        }

        const currentConditions = config.conditions || {};
        const currentConditionKeys = Object.keys(currentConditions);
        const expectedConditions = conditions || {};

        // loop key and value and check conditions
        for (const i in expectedConditions) {
            const defaultConditionRequired = expectedConditions[i]["required"];
            const currentValue = currentConditions[i];

            // is condition missing
            if (defaultConditionRequired && !currentConditionKeys.includes(i)) {
                missingConditionMap[i] = "boolean";
                continue;
            }

            // is current condition value not boolean
            if (typeof currentValue !== "boolean") {
                faultConditionMap[i] = "boolean";
            }
        }

        // if missing condition is not empty
        if (!isEmpty(missingConditionMap)) {
            return {
                msg: "Missing conditions",
                status: "failed",
                data: {},
                code: 400,

                fix: {
                    msg: "add missing conditions as boolean type",
                    conditions: missingConditionMap,
                    optional_missing: faultConditionMap,
                },
            };
        }

        const html = template(config.config, config.conditions);

        return {
            msg: "template binding success",
            status: "success",
            data: {
                html,
            },
        };
    } catch (error) {
        return {
            msg: "exited template binding",
            status: "exited",
            code: 500,
            error: error,
        };
    }
};

module.exports = bindEmailTemplate;
