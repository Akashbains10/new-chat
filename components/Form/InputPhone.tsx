import clsx from 'clsx';
import { useEffect } from 'react';
import { Control, Controller, FieldValues, useForm, UseFormRegisterReturn } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  value?: string;
  floating?: boolean;
  name: string;
  control: Control<FieldValues, any>
};

export const InputPhone = (props: InputFieldProps) => {
  const { name, control, error, value, floating = false, label } = props;

  const handleChange = (change: (event: string) => void) => (value: string) => {
    const e = {
      target: {
        value,
        name,
      },
    };
    change(value);
  };

  return (
    <FieldWrapper label={label} error={error}>
      <Controller
        name={name ?? ''}
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            className={clsx('form-control phone-control', floating && 'floating')}
            placeholder="Enter phone number"
            value={value}
            onChange={handleChange(onChange)}
          />
        )}
      />
    </FieldWrapper>
  );
};
