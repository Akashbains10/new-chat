'use client'

import InputField from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { useHookForm } from "@/hooks/useHookForm";
import { LoadingButton } from "@mui/lab";
import * as z from 'zod';
import { useState } from "react";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form/Form";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1),
  password: z.string({ required_error: "Password is required" }).min(1)
})


export const LoginComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { methods } = useHookForm<FormValues, typeof schema>(schema);
  const { formState, control } = methods;


  const handleFormSubmit = (values: any) => {
    try {
      setLoading(true)
      signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })
        .then((res: SignInResponse | undefined) => {
          if (!res?.ok && res?.error) {
            toast.error(res?.error)
          } else {
            toast.success('User login successfuly')
            router.push('/')
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            console.log(err)
          }
        })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form<FormValues>
      methods={methods}
      onSubmit={handleFormSubmit}
    >
      <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
        <InputField
          control={control}
          name="email"
          error={formState.errors['email']}
          label="Email"
          fullWidth={true}
          type="email"
        />
      </div>
      <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '20px' }}>
        <PasswordField
          control={control}
          error={formState.errors['password']}
          label="Password"
          name="password"
        />
      </div>
      <div className="mt-3" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loading}
        >
          Submit
        </LoadingButton>
      </div>

    </Form>
  )
}