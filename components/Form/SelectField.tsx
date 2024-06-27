import React from 'react';
import { Control, Controller } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {FormControl, FormHelperText} from '@mui/material';
import Select from '@mui/material/Select';

type SelectProps = {
    name: string;
    error: any;
    className?: string;
    options: { label: string, value: string }[]
    control: Control<any>;
    label: string
}

const SelectField: React.FC<SelectProps> = ({
    name,
    error,
    className,
    options,
    control,
    label
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormControl fullWidth error={!!error?.message}>
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        className={className}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Age"
                        onChange={(val) => onChange(val)}
                    >
                        {options?.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                    {error?.message &&
                        <FormHelperText id="component-error-text">
                            {error?.message}
                        </FormHelperText>
                    }
                </FormControl>
            )}
        >

        </Controller>
    )
}

export default SelectField
