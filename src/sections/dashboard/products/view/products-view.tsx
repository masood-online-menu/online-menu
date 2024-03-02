'use client';

import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import ProductsDataGrids from '../products-data-grids';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

export default function ProductsView() {
  const router = useRouter();
  const color = useSelector((state: RootState) => state.setting.color);

  const handleNewProduct = () => {
    router.push(paths.products.new);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">مدیریت محصولات</Typography>
          <Button
            variant="outlined"
            sx={{ fontFamily: 'IranSans' }}
            onClick={handleNewProduct}
            color={color}
          >
            افزودن محصول جدید
          </Button>
        </Stack>
        <ProductsDataGrids />
      </Stack>
    </Paper>
  );
}
