'use client';

import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import ProductNewEditForm from '../product-new-edit-form';

export default function ProductsNewView() {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">افزودن محصول جدید</Typography>
        </Stack>
        <ProductNewEditForm />
      </Stack>
    </Paper>
  );
}
