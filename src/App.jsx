import 'src/global.css';
// i18n
import 'src/locales/i18n';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import ThemeProvider from 'src/theme';
import Router from 'src/routes/sections';
import { LocalizationProvider } from 'src/locales';
import { SettingsProvider } from 'src/components/settings';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';

import useStore from './store';
import config from './config-global';
import { TourProvider } from './context/tour';

export default function App() {
  useScrollToTop();

  const { bootstrap } = useStore();

  useEffect(() => {
    bootstrap();
    //eslint-disable-next-line
  }, []);

  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <TourProvider>
                  <Router />
                </TourProvider>
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </GoogleOAuthProvider>
  );
}
