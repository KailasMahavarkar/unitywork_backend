const mongoose = require('mongoose');

const chatModelSchema = {
    _id: { type: mongoose.Types.ObjectId, auto: true },

    sellerId: {
        type: String,
        required: true,
    },

    

    verificationStatus: {
        type: String,
        required: true,
        enum: ["pending", "approved", "rejected"],
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    govtIdCardSecureUrl: {
        type: String,
        required: true,
    },

    govtIdCardPublicId: {
        type: String,
        required: true,
    },

    selfieGovtIdCardSecureUrl: {
        type: String,
        required: true,
    },

    selfieGovtIdCardPublicId: {
        type: String,
        required: true,
    },

    createTS: {
        type: Number,
        required: true,
        default: Date.now(),
    },
    updateTS: {
        type: Number,
        required: true,
        default: Date.now(),
    },
}


// create index for apikey
const ChatModel = mongoose.model('Chat', chatModelSchema);

module.exports = ChatModel;