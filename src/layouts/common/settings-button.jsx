import { m } from 'framer-motion';
import IconButton from '@mui/material/IconButton';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function SettingsButton() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  return (
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
      <Iconify icon="solar:settings-bold-duotone" width={30} />
    </IconButton>
  );
}
