import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'requested',
        enum: ['accepted', 'requested', 'rejected']
    }
}, {
    timestamps: true
});

const Requests = mongoose?.models?.Request || mongoose.model('Request', requestSchema);
export default Requests;