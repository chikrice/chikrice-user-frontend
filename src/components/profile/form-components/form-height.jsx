//import PropTypes from 'prop-types';

import { IconButton, InputAdornment } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

import FormLayout from './form-layout';

export default function HeightInput() {
  const { t } = useTranslate();
  return (
    <FormLayout title={t('height')} description={t('eidtHeight')}>
      <RHFTextField
        name="height"
        type={'number'}
        label={t('height')}
        placeholder={t('heightPlaceholder')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <Iconify icon={'mdi:human-male-height'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormLayout>
  );
}

//HeightInput.propTypes = {}
