import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Divider, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AddressItem({ address, action, sx, ...other }) {
  const { name, fullAddress, addressType, phoneNumber, isPrimary, notes, addressLink } = address;

  const { t } = useTranslate();

  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';

  return (
    <Stack
      component={Paper}
      spacing={2}
      alignItems={{ md: 'flex-end' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Stack flexGrow={1} spacing={1}>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle2">
            {name}
            <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
              ({t(addressType)})
            </Box>
          </Typography>

          {isPrimary && (
            <Label color="info" sx={{ ml: 1 }}>
              {t('primary')}
            </Label>
          )}
        </Stack>

        <div style={{ direction: 'ltr', textAlign: isRTL ? 'right' : 'left' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {fullAddress}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {phoneNumber}
          </Typography>

          <Link
            sx={{
              textDecoration: 'underline',
              justifyContent: 'left',
              display: 'flex',
              alignItems: 'start',
              gap: 1,
              mt: 1,
            }}
            href={addressLink}
          >
            <Iconify icon="fluent:location-28-filled" />
            {t('location')}
          </Link>
        </div>

        {!!notes && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <b>{t('notes')}:</b> {notes}
            </Typography>
          </>
        )}
      </Stack>

      {action && action}
    </Stack>
  );
}

AddressItem.propTypes = {
  action: PropTypes.node,
  address: PropTypes.object,
  sx: PropTypes.object,
};
