'use server'
import db from "@/utils/connectDB";
import { registerSchema } from "./registerSchema";
import User from "@/models/user.model";
import bcrypt from 'bcryptjs';


export default async function registerAction(prev: any, formValues: any) {
    try {
        const validatedFields = registerSchema.safeParse(formValues)
        if (!validatedFields.success) {
            return {
                status: 'error',
                message: validatedFields.error.flatten().fieldErrors,
            }
        }
        db.connectDB();
        const date = new Date(formValues.dob)
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        formValues.dob = date;
        const userExists = await User.findOne({ email: formValues.email })
        if (userExists) return { status: 'error', message: 'User already exists' }
        formValues.password = await bcrypt.hash(formValues.password, 8);
        await User.create(formValues)
        return { status: 'success', message: 'User created successfuly' }
    } catch (error) {
        if (error instanceof Error) {
            console.log({ error: error })
            return { status: 'error', message: error.message }
        }
    }
}