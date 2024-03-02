'use client';

import { useMemo } from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from '@mui/material/styles';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import RTL from './options/right-to-left';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography: typography,
      shape: { borderRadius: 8 },
      direction: 'rtl',
    }),
    []
  );

  const theme = createTheme((baseOption as unknown) as ThemeOptions);

  return (
    <MuiThemeProvider theme={theme}>
      <RTL themeDirection="rtl">{children}</RTL>
    </MuiThemeProvider>
  );
}
