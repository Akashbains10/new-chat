import * as z from 'zod';

export const registerSchema = z.object({
    first_name: ((msg: string) => z.string({ required_error: msg }).min(1, msg))("Please enter first name"),
    last_name: ((msg: string) => z.string({ required_error: msg }).min(1, msg))("Please enter last name"),
    password: ((msg: string) => z.string({ required_error: msg }).min(1, msg))("Please enter password"),
    confirm_password: ((msg: string) => z.string({ required_error: msg }).min(1, msg))("Please enter confirm password"),
    email: ((msg: string) => z.string({ required_error: msg }).email().min(1, msg))("Please enter email"),
    dob: ((msg: string) => z.string({ required_error: msg, invalid_type_error: msg }).min(1, msg))("Please select birth date"),
    gender: ((msg: string) => z.string({ required_error: msg }).min(1, msg))("Please select gender")
})
    .refine(data => data.password === data.confirm_password, {
        message: "Password didn't match",
        path: ['confirm_password']
    })