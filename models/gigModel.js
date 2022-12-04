import mongoose from 'mongoose';
import { gigCategoryEnum, gigStatusEnum, gigTagsEnum } from './data';
import mongoosePaginate from 'mongoose-paginate-v2';


const gigSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },

    ratings: {
        type: Array,
        default: [],
    },

    sellerId: {
        type: String,
        required: true,
        maxlength: 100,
    },

    title: {
        type: String,
        required: true,
        maxlength: 100,
    },

    sellerName: {
        type: String,
        required: true,
        maxlength: 100,
    },

    sellerAvatar: {
        type: String,
        required: true,
        maxlength: 100,
    },

    sellerCountry: {
        type: String,
        required: true,
        maxlength: 100,
    },


    thumbnail: {
        type: String,
        required: true,
        maxlength: 1000,
    },

    images: {
        type: Array,
        default: [],
    },

    blog: [],

    description: {
        type: String,
        required: true,
        maxlength: 1000,
    },

    category: {
        type: String,
        required: true,
        enum: {
            values: gigCategoryEnum,
            message: 'gig category is incorrect'
        }
    },

    price: {
        type: Number,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
        default: []
    },
    deliveryFiles: {
        type: Array,
        required: false,
        default: [],
    },
    chats: {
        type: Array,
        required: false,
        default: [
            {
                time: Number,
                sender: String,
                message: String,
                pinned: Boolean,
                attachments: Array,
            }
        ],
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
            message: 'Status is either: pending, inprogress, completed or cancelled'
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

export default GigModel
