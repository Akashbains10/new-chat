import {
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
  } from "@mui/material";
  import clsx from "clsx";
  import { useState } from "react";
  import { Controller, UseFormRegisterReturn, Control } from "react-hook-form";
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
  
  type PasswordFieldProps = {
    name?: string;
    control: Control<any>;
    error: any;
    label?: string;
    id?:string;
    className?: string;
  };
  
  export const PasswordField = (props: PasswordFieldProps) => {
    const { error, name, label, control, id, className } = props;
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

  
    return (
      <Controller
        name={name ?? ""}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth variant="outlined" error={!!error?.message}>
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
              className={className}
              id={id ? id : "outlined-adornment-password"}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
              value={value ?? ''}
              defaultValue={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const val = event.target.value;
                onChange(val);
              }}
              autoComplete='off'
            />
            {error?.message && (
              <FormHelperText id="component-error-text">
                {error?.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    );
  };
  