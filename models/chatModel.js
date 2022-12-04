const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const chatModelSchema = {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    chats: [
        {
            type: mongoose.Types.ObjectId,
            from: {
                type: String,
                required: true,
                enum: ['seller', 'buyer']
            },
            sellerId: {
                type: String,
                required: true,
            },
            buyerId: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Number,
                default: Date.now(),
                required: true,
            },
        }
    ],
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