import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expiresIn: {
            type: Date,
            required: true
        }
    }
);

const Token = mongoose?.models?.Token || mongoose.model('Token', tokenSchema);
export default Token;