'use client';

import ThemeProvider from '@/theme';
import '@/assets/fonts/IRANSansFaNum/woff2/index.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          padding: 0,
          margin: 0,
          width: '100vw',
          height: '100vh',
          fontFamily: 'IranSans',
        }}
      >
        <Provider store={store}>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
