import mongoose from 'mongoose';
import * as z from 'zod';

export const requestSchema = z.object({
    senderId: z.string({required_error: 'Sender Id is required', invalid_type_error: 'Sender Id is required'}).refine((val)=> {
        return mongoose.Types.ObjectId.isValid(val)
    },{
        message: 'Invalid sender Id'
    }),
    receiverId: z.string({required_error: 'Receiver Id is required', invalid_type_error: 'Receiver Id is required'}).refine((val)=> {
        return mongoose.Types.ObjectId.isValid(val)
    },{
        message: 'Invalid reciever Id'
    })
})