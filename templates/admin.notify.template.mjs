const schema = {
	object: {
		type: "object",
	},
};

const template = (config) => {
	return `<pre>${JSON.stringify(config.object, null, 2)} </pre>`;
};

export default {
    template,
    schema,
    
    plaintext: template
};
