import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

type InputProps = {
    name?: string,
    control: Control<any>,
    type?: string
    error: any,
    label?: string
    fullWidth?: boolean,
    id?: string;
    className?: string
}

const InputField: React.FC<InputProps> = ({
    name,
    control,
    type,
    error,
    label,
    fullWidth,
    id,
    className
}) => {
    return (
        <Controller
            name={name ?? ''}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormControl fullWidth={fullWidth} error={!!error?.message}>
                    <InputLabel>
                        {label}
                    </InputLabel>
                    <OutlinedInput
                        type={type}
                        id={id ? id : "component-outlined"}
                        label={label}
                        value={value ? value : ''}
                        className={className}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const val = event.target.value;
                            onChange(val);
                        }}
                        inputProps={{
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                    />
                    {error?.message &&
                        <FormHelperText id="component-error-text">{error?.message}</FormHelperText>
                    }
                </FormControl>
            )}
        />

    )
}

export default InputField
