'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';
import LoginForm from '../login-form';
import Iconify from '@/components/iconify';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';

export default function LoginPageView() {
  const router = useRouter();
  return (
    <Stack>
      <Typography>خوش آمدید </Typography>
      <Typography variant="h4" sx={{ mb: 5 }}>
        ورود به حساب کاربری
      </Typography>
      <LoginForm />
      <Stack>
        <Typography
          variant="body1"
          color="primary"
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
          }}
          onClick={() => router.push(paths.forgot)}
        >
          <Iconify icon="mdi:password-reset" />
          فراموشی رمز عبور
        </Typography>
      </Stack>
    </Stack>
  );
}
