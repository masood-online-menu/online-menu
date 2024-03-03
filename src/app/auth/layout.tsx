'use client';

import AuthLayout from '@/layouts/auth/auth-layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import 'moment/locale/fa';

interface props {
  children: React.ReactNode;
}

export default function Layout({ children }: props) {
  return (
    <LocalizationProvider dateAdapter={AdapterMomentJalaali} adapterLocale="fa">
      <AuthLayout>{children}</AuthLayout>
    </LocalizationProvider>
  );
}
