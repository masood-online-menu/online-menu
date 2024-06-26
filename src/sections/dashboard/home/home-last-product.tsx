import { ProductType } from '@/@types/products/productType';
import ProductCard from '@/components/cards/product-card';
import { paths } from '@/routes/paths';
import { Paper, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  product: ProductType[];
}
export default function HomeLastProduct(props: Props) {
  const { product } = props;
  const router = useRouter();
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle1">آخرین محصولات اضافه شده</Typography>
        <Typography
          variant="subtitle2"
          color="primary.main"
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push(paths.products.root)}
        >
          دیدن همه
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{ mt: 3 }}
      >
        {product?.length > 0 ? (
          product
            .slice(0, 3)
            .map((item, index) => <ProductCard key={index} data={item} />)
        ) : (
          <Stack>
            <Typography>محصولی یافت نشد</Typography>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
