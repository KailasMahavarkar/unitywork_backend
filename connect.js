// connection to database
const mongoose = require('mongoose');
const env = require("./env");

let conn;

const connect = async () => {
    // conenction url
    const dbUrl = env.DB_URL;

    const mongoOptions = {
        serverSelectionTimeoutMS: 5000,
        retryWrites: true,
    };

    try {
        conn = mongoose.connect(dbUrl, mongoOptions);

        console.log({
            message: `Connected to MongoDB`,
            url: dbUrl,
        });
    } catch (error) {
        console.log({
            message: `Error connecting to MongoDB`,
            error: error.message,
        });
    }
    return conn;
};

module.exports = connect;
