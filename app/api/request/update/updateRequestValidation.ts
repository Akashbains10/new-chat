import mongoose from 'mongoose';
import * as z from 'zod';

export const updateRequestSchema = z.object({
    requestId: ((msg: string) => z
        .string({ required_error: msg, invalid_type_error: msg })
        .refine((val) => {
            return mongoose.Types.ObjectId.isValid(val)
        }, {
            message: 'requestId must be a valid mongo id'
        }))("requestId is required"),
    status: ((msg: string) => z
        .enum(['accepted', 'rejected'], {
            required_error: msg,
            invalid_type_error: msg
        }))("status is required")
})