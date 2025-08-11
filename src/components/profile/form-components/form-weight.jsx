//import PropTypes from 'prop-types';

import { IconButton, InputAdornment } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

import FormLayout from './form-layout';

export default function WeightInput() {
  const { t } = useTranslate();
  return (
    <FormLayout title={t('currentWeight')} description={t('editCurrentWeight')}>
      <RHFTextField
        name="currentWeight"
        type={'number'}
        label={t('weight')}
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

//WeightInput.propTypes = {}
