import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

// -------------------------------------

interface RHFTextFieldProps {
  name: string;
  helperText?: string;
  type: string;
  [key: string]: unknown;
}

export default function RHFTextField({ name, helperText, type, ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
