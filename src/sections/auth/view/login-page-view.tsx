'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';
import LoginForm from '../login-form';

export default function LoginPageView() {
  return (
    <Stack>
      <Typography>خوش آمدید </Typography>
      <Typography variant="h4" sx={{ mb: 5 }}>
        ورود به حساب کاربری
      </Typography>
      <LoginForm />
    </Stack>
  );
}
