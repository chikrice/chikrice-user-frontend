import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import maleSrc from 'src/assets/images/male.png';
import femaleSrc from 'src/assets/images/female.png';
import { RHFTextField } from 'src/components/hook-form';
import maleDisabledSrc from 'src/assets/images/male-disabled.svg';
import femaleDisabledSrc from 'src/assets/images/female-disabled.svg';

import FormLayout from './form-layout';

//---------------------------------------------------

const StyledBox = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
}));

export default function NameEmailGenderInputs({ gender, setValue }) {
  const { t } = useTranslate();
  return (
    <FormLayout title={t('personalDetails')} description={t('editPersonalDetails')}>
      <RHFTextField name={'name'} label={t('fullName')} />
      <RHFTextField name={'email'} label={t('email')} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          height: 200,
        }}
      >
        <StyledBox>
          {gender === 'female' ? (
            <Image
              src={femaleSrc}
              height={'100%'}
              alt={'disabled female image'}
              onClick={() => setValue('gender', 'female')}
            />
          ) : (
            <Image
              src={femaleDisabledSrc}
              height={'100%'}
              alt={'disabled female image'}
              onClick={() => setValue('gender', 'female')}
            />
          )}
          <Typography textAlign={'center'} color={'text.secondary'} mt={1}>
            {t('female')}
          </Typography>
        </StyledBox>
        <Box
          sx={{
            height: '100%',
            width: '1px',
            mx: 'auto',
            transform: 'rotate(15deg)',
            backgroundColor: (theme) => theme.palette.divider,
          }}
        />
        <StyledBox>
          {gender === 'male' ? (
            <Image
              src={maleSrc}
              height={'100%'}
              alt={'disabled female image'}
              onClick={() => setValue('gender', 'male')}
            />
          ) : (
            <Image
              src={maleDisabledSrc}
              height={'100%'}
              alt={'disabled female image'}
              onClick={() => setValue('gender', 'male')}
            />
          )}
          <Typography textAlign={'center'} color={'text.secondary'} mt={1}>
            {t('male')}
          </Typography>
        </StyledBox>
      </Box>
    </FormLayout>
  );
}

NameEmailGenderInputs.propTypes = {
  gender: PropTypes.string,
  setValue: PropTypes.func,
};
