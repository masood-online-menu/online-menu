'use client';

import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import CategoryNewEditForm from '../category-new-edit-form';

export default function CategoryNewView() {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">افزودن دسته بندی جدید</Typography>
        </Stack>
        <CategoryNewEditForm />
      </Stack>
    </Paper>
  );
}
