const jwt = require('jsonwebtoken');
const { isEmpty } = require("../helper");


const _authToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // return on empty
    if (isEmpty(authHeader)) {
        return res.status(401).json({
            msg: "Authentication token invalid or expired",
            error: "SE_AUTH_TOKEN_ERROR_1",
        })
    }


    const token = authHeader.split(' ')[1]
    if (isEmpty(token)) {
        return res.status(401).json({
            msg: "Authentication token invalid or expired",
            error: "SE_AUTH_TOKEN_ERROR_2",
        })
    }

    try {
        res.locals.tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("leaving... _authToken")
        return next()
    } catch (error) {
        return res.status(401).json({
            msg: "Authentication token invalid or expired",
            error: "SE_AUTH_TOKEN_MAIN",
        })
    }
};

module.exports = _authToken;