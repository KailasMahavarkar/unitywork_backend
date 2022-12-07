const Ajv = require('ajv');
const ValidationError = require('ajv/dist/runtime/validation_error');
const { showAJVErrors } = require('./helper');
const templates = require('./templates/template');

const ajv = new Ajv();

async function bindTemplate(template, obj) {


    // check if template exists
    if (!templates[template]) {
        return {
            errors: [
                {
                    msg: "Template not found",
                },
            ],
        };
    }

    const schema = templates[template]["schema"];
    const templateFunc = templates[template]["template"];
    const plaintextFunc = templates[template]["plaintext"];




    const validate = ajv.compile(schema);
    const valid = validate(obj);

    // if valid, return template
    if (valid) {
        return {
            template: templateFunc(obj),
            plaintext: typeof plaintextFunc === 'function' ? plaintextFunc(obj) : null,
            errors: null
        }
    }

    throw new ValidationError(showAJVErrors(validate.errors));
}

module.exports = bindTemplate;