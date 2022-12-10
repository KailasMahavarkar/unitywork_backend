const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { gigCategoryEnum, gigStatusEnum, gigTimeEnum } = require('./data');

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
    sellerName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    sellerCountry: {
        type: String,
        required: true,
        maxlength: 100,
    },
    images: {
        type: Array,
        default: [],
    },
    blog: {
        type: String,
        required: true,
        maxlength: 1500,
    },

    verified: {
        type: Boolean,
        required: true,
        default: false,
    },

    category: {
        type: String,
        required: true,
        enum: {
            values: gigCategoryEnum,
            message: 'gig category is incorrect'
        }
    },

    packs: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            deliveryTime: {
                type: Number,
                required: true,
            },
            revisions: {
                type: Number,
                required: true,
            },
        }
    ],
    deliveryTime: {
        type: String,
        enum: gigTimeEnum,
        required: true,
    },
    deliveryFiles: {
        type: Array,
        required: false,
        default: [],
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
        type: String,
        required: false,
        default: [],
    }
})

// add paginate support for this model
gigSchema.plugin(mongoosePaginate);

// create index for apikey
const GigModel = mongoose.model('Gig', gigSchema);

module.exports = GigModel;