import { useContext, createContext } from 'react';

import type { Settings } from './settings-provider';

// ----------------------------------------------------------------------

interface SettingsContextValue extends Settings {
  onUpdate: (key: string, value: unknown) => void;
  onChangeDirectionByLang: (lang: string) => void;
  canReset: boolean;
  onReset: () => void;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};
