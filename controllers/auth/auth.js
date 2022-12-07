const jwt = require('jsonwebtoken');
const env = require('../../env');
// generate new access token
const generateAccessToken = (payload) => {
    delete payload.password;
    delete payload.payment;
    delete payload.pastes;

    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRY,
    });
};

// generate new refresh token
const generateRefreshToken = (payload) => {
    delete payload.password;
    delete payload.payment;
    delete payload.pastes;

    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRY,
    });
};

// generate new access token for admin
const generateAdminAccessToken = (payload) => {
    return jwt.sign(payload, env.ADMIN_ACCESS_TOKEN_SECRET, {
        expiresIn: env.ADMIN_ACCESS_TOKEN_EXPIRY,
    });
};

// generate new refresh token
const generateAdminRefreshToken = (payload) => {
    return jwt.sign(payload, env.ADMIN_REFRESH_TOKEN_SECRET, {
        expiresIn: env.ADMIN_REFRESH_TOKEN_EXPIRY,
    });
};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateAdminAccessToken,
    generateAdminRefreshToken,
}