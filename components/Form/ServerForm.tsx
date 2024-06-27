import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"

type FormProps<TFormData extends FormData> = {
    children: React.ReactNode,
    className?: string,
    id?: string,
    actionFn?: (payload: FormData) => void
    methods: UseFormReturn<TFormData>;
    onSubmit: SubmitHandler<TFormData>;
}

const ServerForm = <
TFormData extends FormData>(
        {
            children,
            className,
            id,
            actionFn,
            methods,
            onSubmit
        }: FormProps<TFormData>
    ) => {
    return (
        <form
            action={actionFn}
            id={id}
            className={className}
            onSubmit={methods.handleSubmit(onSubmit)}
        >
            {children}
        </form>
    )
};

export default ServerForm;