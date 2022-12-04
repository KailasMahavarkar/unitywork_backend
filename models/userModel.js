import mongoose, { ObjectId } from 'mongoose';

const userSchema = {
    _id: { type: ObjectId, auto: true },
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

    status: {
        type: String,
        required: true,
        enum: ['active', 'banned', 'deleted'],
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
    role: {
        type: String,
        required: true,
        default: "user", // other roles are staff | admin | seller
    },
    datejoined: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    payment: {
        type: Object,
        required: false,
        default: {
            paypal: "",
            upi: "",
            selected: "paypal",
        },
    },

    gigs: {
        type: Array,
        required: false,
        default: [],
    },

    // social schema
    social: {
        type: Object,
        required: false,
        default: {
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
        }
    },

    transactions: {
        type: Array,
        required: false,
        default: [],
    },

    ratings: {
        type: Array,
        required: false,
    },
    reviews: {
        type: Array,
        required: false,
    },
    stars: {
        type: Number,
        required: false,
    },

    orders: {
        type: Array, //  ['gigid1', 'gigid2', 'gigid3']
        required: false,
    },
    stats: {
        type: Object,
        required: false,
        default: {
            gigCreatedCount: 0,
            gigCreatedTodayCount: 0,
        }
    }
}


// create index for apikey
const UserModel = mongoose.model('User', userSchema);
export default UserModel;