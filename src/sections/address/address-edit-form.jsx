import * as Yup from 'yup';
import { mutate } from 'swr';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { enqueueSnackbar } from 'notistack';
import { matchIsValidTel } from 'mui-tel-input';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import { createAddress, updateAddress } from 'src/api/address';
import RHFTelInput from 'src/components/hook-form/rhf-tel-input';
import FormProvider, { RHFCheckbox, RHFTextField, RHFRadioGroup } from 'src/components/hook-form';

import EditMapBox from './edit-map-box';

const StyledWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  width: '100svw',
  height: '100svh',
  zIndex: 1100,
  backgroundColor: theme.palette.background.default,
}));

export default function AddressEditForm({ userId, address, onEditLocation, onConfirm }) {
  const { t } = useTranslate();

  const NewAddressSchema = Yup.object().shape({
    notes: Yup.string(),
    isPrimary: Yup.boolean(),
    addressType: Yup.string(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    addressLink: Yup.string().required(),
    fullAddress: Yup.string().required(),
    name: Yup.string().required(t('fullNameRequired')),
    phoneNumber: Yup.string()
      .required(t('phoneNumberRequired'))
      .test('is-valid-phone', t('phoneNumberInvalid'), (value) =>
        matchIsValidTel(value, { onlyCountries: ['AE'] })
      ),
  });

  const defaultValues = useMemo(
    () => ({
      _id: address._id,
      name: address.name,
      notes: address.notes,
      latitude: address.latitude,
      longitude: address.longitude,
      isPrimary: address.isPrimary,
      fullAddress: address.fullAddress,
      addressLink: address.addressLink,
      phoneNumber: address.phoneNumber,
      addressType: address.addressType,
    }),
    [address]
  );

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        const { _id, ...cleanData } = data;
        const body = { userId, ...cleanData };

        if (_id) {
          await updateAddress(_id, body);
        } else {
          await createAddress(body);
        }
        await mutate(endpoints.user.get(userId));
        enqueueSnackbar(t('updateSuccess'));
        onConfirm();
      } catch (error) {
        console.error(error);
        enqueueSnackbar(t('somethingWentWrong'), {
          variant: 'error',
        });
      }
    },
    (errors) => {
      console.log(errors);
    }
  );

  useEffect(() => {
    // Update form values when address changes
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <StyledWrapper>
      <Container>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Card
            sx={{
              mt: 7.5,
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.customShadows.card,
            }}
          >
            <CardHeader title="Location information" />

            <CardContent>
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    pb: 1,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color={'text.secondary'}>
                      {address.fullAddress}
                    </Typography>
                    <Link href={address.addressLink}>{t('viewLocation')}</Link>
                  </Box>
                  <EditMapBox
                    latitude={address.latitude}
                    longitude={address.longitude}
                    onClick={onEditLocation}
                  />
                </Box>

                <RHFTextField name="name" label={t('fullName')} />

                <RHFTelInput name="phoneNumber" label={t('phoneNumber')} placeholder={'150 111 2222'} />
                <RHFTextField
                  name="notes"
                  label={t('additionalAddressDetails')}
                  placeholder="Where do we drop your order?"
                />

                <RHFRadioGroup
                  row
                  name="addressType"
                  label={t('addressType') + ' (optional)'}
                  options={[
                    { label: t('home'), value: 'home' },
                    { label: t('office'), value: 'office' },
                  ]}
                />

                <RHFCheckbox name="isPrimary" label={t('useAddressAsDefault')} />
              </Stack>
            </CardContent>

            <CardActions sx={{ p: 2 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting} fullWidth size="large">
                {t('saveAddress')}
              </LoadingButton>
            </CardActions>
          </Card>
        </FormProvider>
      </Container>
    </StyledWrapper>
  );
}

AddressEditForm.propTypes = {
  userId: PropTypes.string,
  address: PropTypes.object,
  onConfirm: PropTypes.func,
  onEditLocation: PropTypes.func,
};
