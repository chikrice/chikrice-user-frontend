import { alpha } from '@mui/material/styles';

import { ThemeMode } from './palette';
import { grey, info, error, common, primary, success, warning, secondary } from './palette';

// ----------------------------------------------------------------------

export type CustomShadows = {
  z1: string;
  z4: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  card: string;
  dropdown: string;
  dialog: string;
  bottomNav: string;
  macrosBar: string;
  primary: string;
  info: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
};

export function customShadows(mode: ThemeMode): CustomShadows {
  const color = mode === 'light' ? grey[500] : common.black;

  const transparent = alpha(color, 0.16);

  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    //
    card: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08);`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
    dialog: `-40px 40px 80px -8px ${alpha(common.black, 0.24)}`,
    bottomNav: `0px -9px 10px 4px ${alpha(color, 0.1)}`,
    macrosBar: `0px 5px 10px 2px ${alpha(color, 0.1)}`,
    //
    primary: `0 8px 16px 0 ${alpha(primary.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(info.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(secondary.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(error.main, 0.24)}`,
    //
  };
}
