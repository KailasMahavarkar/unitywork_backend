const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const refreshTokenSchema = {
    _id: { type: ObjectId, auto: true },
    token: {
        type: String,
        required: true,
    }
}

const RefreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshTokenModel;
