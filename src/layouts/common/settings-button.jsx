import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function SettingsButton({ sx }) {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!settings.canReset}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          top: 13,
          right: 10,
        },
        ...sx,
      }}
    >
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        aria-label={t('settings')}
        onClick={settings.onToggle}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Iconify icon="solar:settings-bold-duotone" width={30} sx={{ mt: 0.5 }} />
      </IconButton>
    </Badge>
  );
}

SettingsButton.propTypes = {
  sx: PropTypes.object,
};
