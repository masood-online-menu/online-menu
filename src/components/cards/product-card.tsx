import { ProductType } from '@/@types/products/productType';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Props {
  data: ProductType;
}
export default function ProductCard(props: Props) {
  const { data } = props;
  return (
    <Paper sx={{ p: 1 }}>
      <Box
        width={200}
        height={200}
        sx={{ borderRadius: 1, overflow: 'hidden' }}
      >
        <Image src={data.image} width={200} height={200} alt={data.name} style={{objectFit: 'cover'}}/>
      </Box>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        {data.name}
      </Typography>
      <Typography variant="subtitle2" sx={{ my: 1 }}>
        قیمت: {data.price}
      </Typography>
      <Divider />
      <Stack sx={{ mt: 1 }} direction="row" gap={1}>
        <Button
          variant="contained"
          color="success"
          sx={{ fontFamily: 'IranSans' }}
        >
          ویرایش
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ fontFamily: 'IranSans' }}
        >
          حذف
        </Button>
      </Stack>
    </Paper>
  );
}
