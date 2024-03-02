'use client';

import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import CategoryDataGrid from '../category-data-grid';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

export default function CategoryView() {
  const router = useRouter();
  const color = useSelector((state: RootState) => state.setting.color);

  const handleNewProduct = () => {
    router.push(paths.categories.new);
  };
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">مدیریت دسته بندی ها</Typography>
          <Button
            variant="outlined"
            sx={{ fontFamily: 'IranSans' }}
            onClick={handleNewProduct}
            color={color}
          >
            افزودن دسته بندی جدید
          </Button>
        </Stack>
        <CategoryDataGrid />
      </Stack>
    </Paper>
  );
}
