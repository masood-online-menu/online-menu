'use client';

import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import ManagementEditForm from '../management-edit-form';

export default function ManagementView() {
  return (
    <Paper sx={{ p: 2, position: 'relative' }}>
      <Stack spacing={4}>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">مدیریت رستوران</Typography>
        </Stack>
        <ManagementEditForm />
      </Stack>
    </Paper>
  );
}
