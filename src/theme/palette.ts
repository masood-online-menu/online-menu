import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

const colors = {
  lighter: '#C9FACD',
  light: '#91F0B1',
  main: '#84A73F',
  dark: '#61892F',
  darker: '#42621A',
  contrastText: '#ffffff',
};

export type ColorSchema =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

const GREY = {
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
};

const PRIMARY = {
  lighter: '#6688ff',
  light: '#4d74ff',
  main: '#3361ff',
  dark: '#194dff',
  darker: '#0039ff',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#FF8D66',
  light: '#FF794D',
  main: '#FF6633',
  dark: '#E64B17',
  darker: '#CC4314',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#66CFFF',
  light: '#4DC7FF',
  main: '#33BFFF',
  dark: '#17A5E6',
  darker: '#008CCC',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#C9FACD',
  light: '#91F0B1',
  main: '#84A73F',
  dark: '#61892F',
  darker: '#42621A',
  contrastText: '#ffffff',
};

const WARNING = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFCB33',
  dark: '#E6B117',
  darker: '#D9A200',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FF6666',
  light: '#F24949',
  main: '#E62E2E',
  dark: '#CC1414',
  darker: '#B20000',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === 'light' ? light : dark;
}
