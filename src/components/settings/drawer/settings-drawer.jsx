import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Box, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { paper } from 'src/theme/css';
import { useLocales, useTranslate } from 'src/locales';

import Iconify from '../../iconify';
import BaseOptions from './base-option';
import PresetsOptions from './presets-options';
import { useSettingsContext } from '../context';
import FullScreenOption from './fullscreen-option';
import { getButtonStyles } from './base-button-styles';

// ----------------------------------------------------------------------

export default function SettingsDrawer() {
  const { t } = useTranslate();

  const settings = useSettingsContext();
  const theme = useTheme();

  const { onChangeLang } = useTranslate();

  const { allLangs, currentLang } = useLocales();

  const handleChangeLang = useCallback(
    (newLang) => {
      onChangeLang(newLang);
    },
    [onChangeLang]
  );

  const labelStyles = {
    mb: 1.5,
    color: 'text.disabled',
    fontWeight: 'fontWeightSemiBold',
  };

  const renderLanguage = (
    <Box>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        {t('language')}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {allLangs.map((option) => (
          <ButtonBase
            key={option.value}
            sx={(theme) => getButtonStyles(theme, option.value === currentLang.value)}
            style={{ height: 56 }}
            selected={option.value === currentLang.value}
            onClick={() => handleChangeLang(option.value)}
          >
            <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />
            {/* <label style={{ margin: '0 8px' }}>{option.label}</label> */}
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );

  const renderMode = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        {t('mode')}
      </Typography>

      <BaseOptions
        value={settings.themeMode}
        onChange={(newValue) => settings.onUpdate('themeMode', newValue)}
        options={['light', 'dark']}
        icons={['sun', 'moon']}
      />
    </div>
  );

  const renderDirection = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        {t('direction')}
      </Typography>

      <BaseOptions
        value={settings.themeDirection}
        onChange={(newValue) => settings.onUpdate('themeDirection', newValue)}
        options={['ltr', 'rtl']}
        icons={['align_left', 'align_right']}
      />
    </div>
  );

  const renderPresets = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        {t('presets')}
      </Typography>

      <PresetsOptions
        value={settings.themeColorPresets}
        onChange={(newValue) => settings.onUpdate('themeColorPresets', newValue)}
      />
    </div>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.open}
      onClose={settings.onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({ theme, bgcolor: theme.palette.background.default }),
          width: 300,
        },
      }}
    >
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {renderLanguage}

        {renderMode}

        {renderDirection}

        {renderPresets}
      </Stack>

      <FullScreenOption />
    </Drawer>
  );
}
