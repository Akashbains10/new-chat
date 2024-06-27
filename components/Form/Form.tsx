import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"

type FormProps<TFormValues extends FieldValues> = {
    className?: string;
    onSubmit: SubmitHandler<TFormValues>;
    children: React.ReactNode;
    id?: string;
    methods: UseFormReturn<TFormValues>;
}

const Form = <TFormValues extends Record<string, unknown>>(
    {
        onSubmit,
        children,
        className,
        methods,
        id
    }: FormProps<TFormValues>
) => {
    return (
        <form
        id={id}
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
        >
            {children}
        </form>
    )
};

export default Form;