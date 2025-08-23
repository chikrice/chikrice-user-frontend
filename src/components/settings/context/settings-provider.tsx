import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback, ReactNode } from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';
import { localStorageGetItem } from 'src/utils/storage-available';

import { SettingsContext } from './settings-context';

import type { PresetName } from 'src/theme/options/presets';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'settings';

export interface Settings {
  themeMode: 'light' | 'dark';
  themeDirection: 'ltr' | 'rtl';
  themeColorPresets: PresetName;
  themeContrast: 'default' | 'bold';
  [key: string]: unknown;
}

interface SettingsProviderProps {
  children: ReactNode;
  defaultSettings: Settings;
}

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

  const [openDrawer, setOpenDrawer] = useState(false);

  const isArabic = localStorageGetItem('i18nextLng') === 'ar' || localStorageGetItem('i18nextLng') === 'fa';

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic]);

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update('themeDirection', lang === 'ar' || lang === 'fa' ? 'rtl' : 'ltr');
    },
    [update]
  );

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
