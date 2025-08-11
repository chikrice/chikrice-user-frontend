import PropTypes from 'prop-types';
import { MuiTelInput } from 'mui-tel-input';
import { Controller, useFormContext } from 'react-hook-form';

export default function RHFTelInput({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTelInput
          {...field}
          fullWidth
          value={field.value}
          onlyCountries={['AE']}
          defaultCountry="AE"
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

RHFTelInput.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
};
