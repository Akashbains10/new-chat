import { Control, Controller } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from "@mui/x-date-pickers";
import { FormControl, FormHelperText } from "@mui/material";
import React from 'react';
import dayjs from "dayjs";

type DateProps = {
    name?: string,
    control: Control<any>,
    error: any,
    label?: string,
    className?: string;
}

const InputDate: React.FC<DateProps> = ({
    control,
    name,
    error,
    label,
    className
}) => {
    return (
        <Controller
            name={name ?? ""}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormControl error={!!error?.message}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker 
                                className={className}
                                label={label}
                                value={value ? dayjs(value) : null}
                                onChange={(newValue) => {
                                    const date = dayjs(newValue).format('DD/MM/YYYY')
                                    onChange(date !== 'Invalid Date' ? date : null)
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {error?.message &&
                        <FormHelperText id="component-error-text">
                            {error?.message}
                        </FormHelperText>
                    }
                </FormControl>
            )}
        />
    )
}

export default InputDate;