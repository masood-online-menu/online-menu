'use client';

import { Box, Stack } from '@mui/material';
import React, { PropsWithChildren, useEffect } from 'react';
import NavBar from './nav-bar';
import { useAuthContext } from '@/auth/hooks';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '@/redux/slices/restaurant';
import { setColor } from '@/redux/slices/setting';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  dispatch(setRestaurant(user?.restaurant[0]));
  dispatch(setColor(user?.restaurant[0]?.color || 'primary'));

  return (
    <Stack
      sx={{
        bgcolor: (theme) => theme.palette.background.neutral,
        height: '100vh',
      }}
      direction="row"
    >
      <NavBar />
      <Box sx={{ py: 5.2, px: 7.5, width: 1 }}>{children}</Box>
    </Stack>
  );
}
