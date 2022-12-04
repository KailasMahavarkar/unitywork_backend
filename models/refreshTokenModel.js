import mongoose, { ObjectId } from 'mongoose';
const refreshTokenSchema = {
    _id: { type: ObjectId, auto: true },
    token: {
        type: String,
        required: true,
    }
}

const RefreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshTokenModel;
