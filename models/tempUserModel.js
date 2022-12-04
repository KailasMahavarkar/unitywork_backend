const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const tempUserSchema = {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    token: {
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
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'banned', 'expired'],
        default: 'pending',
    },
    attempts: {
        type: Number,
        required: true,
        default: 0,
    },
    role: {
        type: String,
        required: true,
        default: "member", // other roles are buddy and admin
    },
    createTS: {
        type: Number,
        required: true,
        default: Date.now(),
    },
    expireTS: {
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
const TempUserModel = mongoose.model('temp', tempUserSchema);

module.exports = TempUserModel;
