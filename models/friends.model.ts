import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    friendId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Friends = mongoose?.models?.Friends || mongoose.model('Friends', friendSchema);
export default Friends;