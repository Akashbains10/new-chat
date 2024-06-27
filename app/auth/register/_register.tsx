'use client'

import Form from "../../../components/Form/Form";
import { useHookForm } from "../../../hooks/useHookForm";
import InputField from '../../../components/Form/InputField';
import { PasswordField } from '../../../components/Form/PasswordField';
import InputDate from '../../../components/Form/InputDate';
import LoadingButton from '@mui/lab/LoadingButton';
import dayjs from 'dayjs';
import SelectField from '../../../components/Form/SelectField';
import { registerSchema } from "./registerSchema";
import { useFormState } from "react-dom";
import registerAction from "./action";
import { useEffect, useState } from "react";
import toast, { Message } from "react-hot-toast";
import { useRouter } from "next/navigation";

type RegisterDTO = {
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
    email: string;
    dob: string;
    gender: string;
}

type ToastProps = "success" | "error" | "loading"

export default function RegisterComponent() {
    const router = useRouter();
    const [state, formAction] = useFormState(registerAction, null);
    const [loading, setLoading] = useState<boolean>(false);
    const { methods } = useHookForm<RegisterDTO, typeof registerSchema>(registerSchema);
    const { control, formState } = methods;

    const handleSubmit = (values: RegisterDTO) => {
        try {
            setLoading(true)
            formAction(values)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (state && state.status) {
            toast[(state?.status) as ToastProps]((state?.message) as Message)
            if (state.status === 'success') {
                router.push('/auth/login')
            }
        }
    }, [state])

    return (
        <Form<RegisterDTO>
            methods={methods}
            onSubmit={handleSubmit}
        >
            <div className='grid grid-cols-2 gap-1'>
                <InputField
                    type='text'
                    label='First Name'
                    name='first_name'
                    control={control}
                    error={formState.errors["first_name"]}
                />
                <InputField
                    type='text'
                    label='Last Name'
                    name='last_name'
                    control={control}
                    error={formState.errors["last_name"]}
                />
                <InputDate
                    className='w-full'
                    label='DOB'
                    name='dob'
                    control={control}
                    error={formState.errors['dob']}
                />
                <SelectField
                    name='gender'
                    className='my-2'
                    control={control}
                    error={formState.errors['gender']}
                    label='Gender'
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                        { label: 'Others', value: 'other' }
                    ]}
                />
            </div>

            <div className='grid grid-cols-1 my-3'>
                <InputField
                    type='text'
                    label='Email'
                    name='email'
                    className='my-3'
                    control={control}
                    error={formState.errors["email"]}
                />
                <PasswordField
                    className="my-3"
                    label='Password'
                    name='password'
                    control={control}
                    error={formState.errors['password']}
                />
                <PasswordField
                    className="mt-3"
                    label='Confirm Password'
                    name='confirm_password'
                    control={control}
                    error={formState.errors['confirm_password']}
                />
            </div>
            <div className="btn">
                <LoadingButton
                    variant="contained"
                    loading={loading}
                    type="submit"
                >
                    Submit
                </LoadingButton>
            </div>
        </Form >
    )
}