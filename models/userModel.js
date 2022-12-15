const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = {
    _id: { type: ObjectId, auto: true },
    avatar: {
        type: Object,
        required: false,
        default: {
            secureUrl: "",
            publicId: ""
        }
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

    country: {
        type: String,
        required: true,
        default: "india"
    },

    location: {
        type: String,
        required: false,
        default: ""
    },

    education: {
        type: String,
        required: false,
        default: ""
    },

    job: {
        type: String,
        required: false,
        default: ""
    },

    description: {
        type: String,
        required: false,
        default: ""
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

    resetToken: {
        type: String,
        required: false,
        default: "",
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
    },
    socials: {
        type: Object,
        required: false,
        default: {
            github: "",
            instagram: "",
            facebook: "",
            twitter: "",
            behance: "",
            youtube: "",
            linkedin: "",
            discord: "",
        }
    },

    verification: {
        type: Object,
        required: false,
        default: {
            firstname: "",
            lastname: "",
            country: "",
            email: "",
            description: "",
            verificationStatus: "created",
            govtIdCard: {
                secureUrl: "",
                publicId: "",
            },
            selfieGovtIdCard: {
                secureUrl: "",
                publicId: "",
            }
        }
    }
}


// create index for apikey
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;