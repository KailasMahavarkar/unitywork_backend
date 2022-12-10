const mongoose = require('mongoose');

const chatModelSchema = {
    _id: { type: mongoose.Types.ObjectId, auto: true },

    sellerId: {
        type: String,
        required: true,
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

    govtIssuedId: {
        type: String,
        required: true,
    },

    selfieGovtIssuedId: {
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