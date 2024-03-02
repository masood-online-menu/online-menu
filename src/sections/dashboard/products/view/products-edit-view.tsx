'use client';

import { Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductNewEditForm from '../product-new-edit-form';
import { ProductType } from '@/@types/products/productType';

type Props = {
  id: string;
};

export default function ProductsEditView({ id }: Props) {
  const [current, setCurrent] = useState<ProductType | null>(null);
  useEffect(() => {
    axios.get(`/api/product/${id}`).then((res) => {
      setCurrent(res.data);
    });
  }, [id]);
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">
            ویرایش محصول {current && current.name}
          </Typography>
        </Stack>
        <ProductNewEditForm currentProduct={current!} />
      </Stack>
    </Paper>
  );
}
