//import PropTypes from 'prop-types';

import { IconButton, InputAdornment } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

import FormLayout from './form-layout';

export default function AgeInput() {
  const { t } = useTranslate();
  return (
    <FormLayout title={t('age')} description={t('editAge')}>
      <RHFTextField
        name="age"
        type={'number'}
        label={t('age')}
        placeholder={t('agePlaceholder')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <Iconify icon={'ph:baby-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormLayout>
  );
}

//AgeInput.propTypes = {}
