import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import Scrollbar from 'src/components/scrollbar';
import { useLocales, useTranslate } from 'src/locales';
import { useCurrencyConverter } from 'src/utils/currency-exchanger';

// ----------------------------------------------------------------------

export default function OrderDetailsItems({
  items,
  shippingPrice,
  totalPrice,
  discountedTotalPrice,
}) {
  const { t } = useTranslate();
  const { lang } = useLocales();
  const { fCurrency } = useCurrencyConverter();

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ my: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}> {t('totalPrice')}</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(totalPrice) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}> {t('discountedTotalPrice')}</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>
          {discountedTotalPrice ? fCurrency(discountedTotalPrice) : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>{t('shipping')}</Box>
        <Box
          sx={{
            width: 160,
            ...(shippingPrice && { color: 'error.main' }),
          }}
        >
          {shippingPrice ? `- ${fCurrency(shippingPrice)}` : '0'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>{t('yourProfit')}</Box>
        <Box
          sx={{
            width: 160,
            ...(discountedTotalPrice && { color: 'success.main' }),
          }}
        >
          {discountedTotalPrice ? `+ ${fCurrency(totalPrice - discountedTotalPrice)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <Box>{t('total')}</Box>
        <Box sx={{ width: 160 }}>{fCurrency(discountedTotalPrice - shippingPrice) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <CardHeader title={t('details')} />

      <Stack
        sx={{
          px: 3,
        }}
      >
        <Scrollbar>
          {items?.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              sx={{
                py: 3,
                minWidth: 640,
                borderBottom: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
              }}
            >
              <Avatar
                src={item?.productId?.imgUrls[0]?.url}
                variant="rounded"
                sx={{ width: 48, height: 48, mr: 2 }}
              />

              <ListItemText
                primary={item?.productId?.name[lang]}
                secondary={item?.productId?.sku}
                primaryTypographyProps={{
                  typography: 'body2',
                }}
                secondaryTypographyProps={{
                  component: 'span',
                  color: 'text.disabled',
                  mt: 0.5,
                }}
              />

              <Box sx={{ typography: 'body2' }}>x{item?.qty}</Box>

              <Box sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}>
                {fCurrency(item?.productId?.priceSale)}
              </Box>
              <Box sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}>
                {fCurrency(item?.productId?.discountedPrice)}
              </Box>
            </Stack>
          ))}
        </Scrollbar>

        {renderTotal}
      </Stack>
    </Card>
  );
}

OrderDetailsItems.propTypes = {
  items: PropTypes.array,
  totalPrice: PropTypes.number,
  shippingPrice: PropTypes.number,
  discountedTotalPrice: PropTypes.number,
};
