const env = require('./env');
const uuidv4 = require('uuid').v4;



const isWindows = env.MACHINE === "windows";

const getQuery = (req) => {
    return JSON.parse(JSON.stringify(req.query));
};

// generate crypto safe random string
function randomToken() {
    return uuidv4().replace(/-/g, '')
}

const MODE = process.env.MODE;


const modeRunMaker = () => {
    const inner = (callback) => {
        if (env.MODE === MODE) {
            // check if callback is a function
            if (typeof callback === "function") {
                return callback();
            } else {
                return callback;
            }
        }
        return "";
    };
    return inner;
};

const runDev = modeRunMaker("dev");
const runProd = modeRunMaker("prod");

const withMode = (object) => {
    if (env.MODE === "prod" || env.MODE === "PROD") {
        return object.prod;
    } else {
        return object.dev;
    }
};


const fakeNumString = (length = 5) => {
    const inner = (length) => {
        let temp = "";
        for (let x = 0; x <= length; x++) {
            temp += Math.floor(Math.random() * 10);
        }
        return temp;
    };
    return inner(length);
};

function stringContains(str, text) {
    return str.indexOf(text) > -1;
}


const isEmpty = (arg) => {
    try {
        if (arg == null) {
            return true;
        } else if (typeof arg === "undefined") {
            return true;
        } else if (arg.length === 0) {
            return true;
        } else if (typeof arg === "object" && Object.keys(arg).length === 0) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

const showError = (error) => {
    return {
        exists: true,
        error: {
            message: error.message,
            stack: runDev(error.stack),
        },
    };
};

const showAJVErrors = (errors) => {
    if (!errors) {
        return {
            key: "Unknown Key",
            message: "Unknown error",
            params: "Null params"
        }
    }
    return errors.map((err) => {
        return {
            key: err.instancePath.split("/")[1],
            message: err.message,
            params: err.params,
        };
    });
};

module.exports = {
    isWindows,
    getQuery,
    randomToken,
    runDev,
    runProd,
    withMode,
    fakeNumString,
    stringContains,
    isEmpty,
    showError,
    showAJVErrors,
}







