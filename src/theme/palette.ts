import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
} as const;

export const primary = {
  lighter: '#C8FAD6',
  light: '#5BE49B',
  main: '#00A76F',
  dark: '#007867',
  darker: '#004B50',
  contrastText: '#FFFFFF',
} as const;

export const secondary = {
  lighter: '#EFD6FF',
  light: '#C684FF',
  main: '#8E33FF',
  dark: '#5119B7',
  darker: '#27097A',
  contrastText: '#FFFFFF',
} as const;

export const info = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
} as const;

export const success = {
  lighter: '#D3FCD2',
  light: '#77ED8B',
  main: '#22C55E',
  dark: '#118D57',
  darker: '#065E49',
  contrastText: '#ffffff',
} as const;

export const warning = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: grey[800],
} as const;

export const error = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
} as const;

export const common = {
  black: '#000000',
  white: '#FFFFFF',
} as const;

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
  active: '' as string,
} as const;

// Type definitions
export type ColorPalette = {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type GreyPalette = typeof grey;
export type CommonColors = typeof common;
export type ActionColors = typeof action;

export type ThemeMode = 'light' | 'dark';

export type CustomPalette = {
  primary: ColorPalette;
  secondary: ColorPalette;
  info: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
  grey: GreyPalette;
  common: CommonColors;
  divider: string;
  action: ActionColors;
  mode: ThemeMode;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    paper: string;
    default: string;
    neutral: string;
  };
  card: {
    default: string;
    soft: string;
  };
  nav: {
    default: string;
    soft: string;
  };
};

const base: Omit<CustomPalette, 'mode' | 'text' | 'background' | 'card' | 'nav'> = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action,
};

// ----------------------------------------------------------------------

export function palette(mode: ThemeMode): CustomPalette {
  const light: CustomPalette = {
    ...base,
    mode: 'light',
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: grey[200],
    },
    card: {
      default: '#F5F8FD',
      soft: grey[200],
    },
    nav: {
      default: grey[100],
      soft: grey[200],
    },
    action: {
      ...base.action,
      active: grey[600],
    },
  };

  const dark: CustomPalette = {
    ...base,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: grey[500],
      disabled: grey[600],
    },
    background: {
      paper: grey[800],
      default: grey[900],
      neutral: alpha(grey[500], 0.12),
    },
    card: {
      default: grey[800],
      soft: grey[800],
    },
    nav: {
      default: grey[700],
      soft: grey[800],
    },
    action: {
      ...base.action,
      active: grey[500],
    },
  };

  return mode === 'light' ? light : dark;
}

// Extend the Material-UI Theme type
declare module '@mui/material/styles' {
  interface Palette {
    card: {
      default: string;
      soft: string;
    };
    nav: {
      default: string;
      soft: string;
    };
  }

  interface PaletteOptions {
    card?: {
      default: string;
      soft: string;
    };
    nav?: {
      default: string;
      soft: string;
    };
  }

  interface Theme {
    customShadows: ReturnType<typeof import('./custom-shadows').customShadows>;
    card: {
      default: string;
      soft: string;
    };
    nav: {
      default: string;
      soft: string;
    };
  }

  interface ThemeOptions {
    customShadows?: ReturnType<typeof import('./custom-shadows').customShadows>;
    card?: {
      default: string;
      soft: string;
    };
    nav?: {
      default: string;
      soft: string;
    };
  }
}
