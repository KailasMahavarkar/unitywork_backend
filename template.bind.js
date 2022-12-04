// import ajv
import Ajv from "ajv";
import ValidationError from "ajv/dist/runtime/validation_error";
import { showAJVErrors } from "./helper";
const ajv = new Ajv();
import templates from "./templates/template";

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
            plaintext: plaintextFunc(obj),
            errors: null
        }
	}

    throw new ValidationError(showAJVErrors(validate.errors));
}

export default bindTemplate;
