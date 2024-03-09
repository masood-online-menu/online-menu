'use client';

import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import ThemeList from '../theme-list';

export default function ThemeView() {
  return (
    <Paper sx={{ p: 2, position: 'relative' }}>
      <Stack spacing={4}>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">مدیریت قالب های منو</Typography>
        </Stack>
        <ThemeList />
      </Stack>
    </Paper>
  );
}
