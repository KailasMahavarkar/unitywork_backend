const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { gigCategoryEnum, gigStatusEnum } = require('./data');

const gigSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },

    sellerId: {
        type: String,
        required: true,
        maxlength: 100,
    },
    sellerUsername: {
        type: String,
        required: true,
        maxlength: 100,
    },
    sellerCountry: {
        type: String,
        required: true,
        maxlength: 100,
    },

    pricings: {
        type: Object,
        default: {
            basic: {
                price: 0,
                deliveryTime: 0,
                revisions: 0,
            },
            standard: {
                price: 0,
                deliveryTime: 0,
                revisions: 0,
            },
            premium: {
                price: 0,
                deliveryTime: 0,
                revisions: 0,
            }
        }
    },

    images: {
        type: Object,
        default: {
            image1: {
                secureUrl: "",
                publicId: "",
            },
            image2: {
                secureUrl: "",
                publicId: "",
            },
            image3: {
                secureUrl: "",
                publicId: "",
            }
        },
    },
    blog: {
        type: String,
        required: true,
        maxlength: 2100,
    },

    sellerVerified: {
        type: Boolean,
        required: true,
        default: false,
    },

    verification: {
        type: String,
        required: true,
        default: "created"
    },

    category: {
        type: String,
        required: true,
        enum: {
            values: gigCategoryEnum,
            message: 'gig category is incorrect'
        }
    },

    // timestamps
    createdAt: {
        type: Number,
        required: true,
        default: Date.now(),
    },
    updatedAt: {
        type: Number,
        required: true,
        default: Date.now(),
    },

    // status
    status: {
        type: String,
        required: true,
        default: 'draft',
        enum: {
            values: gigStatusEnum,
            message: `gig status is incorrect. gig status must be one of ${gigStatusEnum.join(', ').trim()}`
        }
    },

    tags: {
        type: Array,
        required: false,
        default: [],
    }
})

// add paginate support for this model
gigSchema.plugin(mongoosePaginate);

// create index for apikey
const GigModel = mongoose.model('Gig', gigSchema);

module.exports = GigModel;