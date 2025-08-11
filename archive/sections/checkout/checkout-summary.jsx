import { useState } from 'react';
import PropTypes from 'prop-types';
import { addDays } from 'date-fns';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import Image from 'src/components/image';
import Label from 'src/components/label';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { convertToDate, fDate } from 'src/utils/format-time';
import { useTranslatePlanHeader } from 'src/locales/hooks/translate';
import CustomBottomDrawer from 'src/components/custom-drawer/custom-drawer';

import { useCheckoutContext } from './context/checkout-context';

// ----------------------------------------------------------------------

export default function CheckoutSummary({
  details,
  subTotal,
  totalPrice,
  deliveryDate,
  totalDiscount,
  deliveryPrice,
  //
  onApplyDiscount,
}) {
  const { t } = useTranslate();
  const checkout = useCheckoutContext();
  const { translateHeader } = useTranslatePlanHeader();

  const [isEditDeliveryDate, setIsEditDeliveryDate] = useState(false);

  const handleChangeDeliveryDate = (newDate) => {
    const { daysCount } = details;

    checkout.onUpdateDeliveryDate(daysCount, newDate);
    setIsEditDeliveryDate(false);
  };

  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardHeader
          avatar={<Image src={'src/assets/icons/14-day.png'} width={55} />}
          title={t(details.title)}
          subheader={translateHeader(details)}
        />
        <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />

        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('days')}
              </Typography>
              <Typography variant="subtitle2"> {details.daysCount} </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('meals')}
              </Typography>
              <Typography variant="subtitle2"> {details.mealsCount} </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('snacks')}
              </Typography>
              <Typography variant="subtitle2"> {details.snacksCount} </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('subTotal')}
              </Typography>
              <Typography variant="subtitle2">
                {subTotal} {t('AED')}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('delivery')}
              </Typography>
              <Typography variant="subtitle2">
                {deliveryPrice.total} {t('AED')}{' '}
                <small style={{ color: 'GrayText' }}>
                  ({deliveryPrice.perDay} {t('deliveryPerDay')})
                </small>
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('discount')}
              </Typography>
              <Typography variant="subtitle2">
                <Label color="error">{totalDiscount} %</Label>
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('date')}
              </Typography>
              <Typography variant="subtitle2">
                <small>{t('from')}</small> <Label>{fDate(deliveryDate.from)}</Label>{' '}
                <small>{t('to')}</small> <Label>{fDate(deliveryDate.to)}</Label>
              </Typography>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">{t('total')}</Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                  {totalPrice} {t('AED')}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  ({t('vatIncluded')})
                </Typography>
              </Box>
            </Stack>

            {onApplyDiscount && (
              <TextField
                fullWidth
                placeholder={t('discountPlaceholder')}
                value="DISCOUNT5"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button color="primary" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                        {t('apply')}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Stack>
        </CardContent>
      </Card>

      <Button
        color="primary"
        startIcon={<Iconify icon="solar:pen-new-square-line-duotone" />}
        onClick={() => setIsEditDeliveryDate(true)}
        sx={{ float: 'right' }}
      >
        {t('changeDeliveryDate')}
      </Button>
      <CustomBottomDrawer
        open={isEditDeliveryDate}
        onOpen={() => setIsEditDeliveryDate(true)}
        onClose={() => setIsEditDeliveryDate(false)}
      >
        <Box
          sx={{
            px: 2,
            pb: 0.5,
            display: 'flex',
            alignItems: 'start',
            width: '320px',
            mx: 'auto',
            gap: 1,
          }}
        >
          <Iconify icon={'streamline:calendar-jump-to-date'} />
          <Typography variant="h4">Change Delivery Date to</Typography>
        </Box>
        <DateCalendar
          value={convertToDate(deliveryDate.from)}
          onChange={handleChangeDeliveryDate}
          minDate={addDays(new Date(), 1)}
        />
      </CustomBottomDrawer>
    </>
  );
}

CheckoutSummary.propTypes = {
  details: PropTypes.object,
  totalPrice: PropTypes.number,
  totalDiscountedPrice: PropTypes.number,
  totalDiscount: PropTypes.number,
  deliveryPrice: PropTypes.object,
  subTotal: PropTypes.number,
  deliveryDate: PropTypes.object,
  onApplyDiscount: PropTypes.func,
};
