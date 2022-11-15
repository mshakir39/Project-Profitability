import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

/* eslint-disable-next-line */
export interface StandardTextInputProps {
  label: string;
  required?: boolean;
  sx?: object;
  labelStyle?: object;
  inputStyle?: object;
  dataTestId: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  variant?: string;
  size?: "medium" | "small" | undefined;
  startAdornment?: React.ReactNode;
  disabled?: boolean;
}

export const TextInput: React.FC<StandardTextInputProps> = (props) => {
  // Separating props for a mix of usages, with defaults for sx.
  const {
    startAdornment,
    helperText,
    dataTestId,
    sx,
    labelStyle,
    inputStyle,
    disabled,
    ...rest
  } = props;
  const localSx = { ...{ width: "100%", height: "54px" }, ...sx };

  return (
    <TextField
      helperText={helperText}
      InputLabelProps={{
        style: labelStyle,
      }}
      InputProps={{
        startAdornment,
        style: inputStyle,
      }}
      data-testid={dataTestId}
      data-cy="text-input"
      {...rest}
      variant="standard"
      sx={(theme) => ({
        label: {
          color: theme.palette.text.primary,
        },
        ...localSx,
      })}
      margin="normal"
      disabled={disabled}
    />
  );
};

export default TextInput;
