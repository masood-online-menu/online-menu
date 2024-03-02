'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';
import AdminForm from '../admin-form';

export default function AdminView() {
  return (
    <Stack>
      <Typography>خوش آمدید </Typography>
      <Typography variant="h4" sx={{ mb: 5 }}>
        ساخت حساب کاربری
      </Typography>
      <AdminForm />
    </Stack>
  );
}
