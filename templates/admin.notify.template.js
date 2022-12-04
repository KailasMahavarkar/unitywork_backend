const schema = {
    object: {
        type: "object",
    },
};

const template = (config) => {
    return `<pre>${JSON.stringify(config.object, null, 2)} </pre>`;
};

module.exports = {
    template,
    schema,
    plaintext: template
}