import env from "./env";
import { v4 as uuidv4 } from 'uuid';

export const isWindows = env.MACHINE === "windows";

export const getQuery = (req) => {
    return JSON.parse(JSON.stringify(req.query));
};

// generate crypto safe random string
export function randomToken() {
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

export const runDev = modeRunMaker("dev");
export const runProd = modeRunMaker("prod");

export const withMode = (object) => {
    if (env.MODE === "prod" || env.MODE === "PROD") {
        return object.prod;
    } else {
        return object.dev;
    }
};


export const fakeNumString = (length = 5) => {
    const inner = (length) => {
        let temp = "";
        for (let x = 0; x <= length; x++) {
            temp += Math.floor(Math.random() * 10);
        }
        return temp;
    };
    return inner(length);
};

export function stringContains(str, text) {
    return str.indexOf(text) > -1;
}

// const is = {
// 	arr: (a) => Array.isArray(a),
// 	obj: (a) => stringContains(Object.prototype.toString.call(a), "Object"),
// 	pth: (a) => is.obj(a) && a.hasOwnProperty("totalLength"),
// 	str: (a) => typeof a === "string",
// 	fnc: (a) => typeof a === "function",
// 	und: (a) => typeof a === "undefined",
// 	nil: (a) => is.und(a) || a === null,
// 	hex: (a) => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
// };

export const isEmpty = (arg) => {
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

export const showError = (error) => {
    return {
        exists: true,
        error: {
            message: error.message,
            stack: runDev(error.stack),
        },
    };
};

export const showAJVErrors = (errors) => {
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



