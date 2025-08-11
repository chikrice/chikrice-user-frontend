//import PropTypes from 'prop-types';

import { IconButton, InputAdornment } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

import FormLayout from './form-layout';

export default function TargetWeightInput() {
  const { t } = useTranslate();
  return (
    <FormLayout title="Target Weight" description="Edit your desired weight">
      <RHFTextField
        name="targetWeight"
        type={'number'}
        label={t('targetWeight')}
        placeholder={t('weightPlaceholder')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <Iconify icon={'fa-solid:weight'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormLayout>
  );
}

//TargetWeightInput.propTypes = {}
