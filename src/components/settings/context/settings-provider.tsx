import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback, ReactNode } from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';
import { localStorageGetItem } from 'src/utils/storage-available';

import { SettingsContext } from './settings-context';

import type { PresetName } from 'src/theme/options/presets';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'settings';

const DEFAULT_SETTINGS = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'vertical',
  themeColorPresets: 'default',
  themeStretch: false,
} as const;

export interface Settings {
  themeMode: 'light' | 'dark';
  themeDirection: 'ltr' | 'rtl';
  themeColorPresets: PresetName;
  themeContrast: 'default' | 'bold';
  [key: string]: unknown;
}

interface SettingsProviderProps {
  children: ReactNode;
  defaultSettings?: Settings;
}

export function SettingsProvider({ children, defaultSettings = DEFAULT_SETTINGS }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

  const [openDrawer, setOpenDrawer] = useState(false);

  const isArabic = localStorageGetItem('i18nextLng') === 'ar' || localStorageGetItem('i18nextLng') === 'fa';

  // Direction by lang - define before useEffect
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update('themeDirection', lang === 'ar' || lang === 'fa' ? 'rtl' : 'ltr');
    },
    [update]
  );

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
  }, [isArabic, onChangeDirectionByLang]);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [reset, update, state, canReset, openDrawer, onCloseDrawer, onToggleDrawer, onChangeDirectionByLang]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
