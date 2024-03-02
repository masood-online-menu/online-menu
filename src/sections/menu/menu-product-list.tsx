import { CategoryType } from '@/@types/category/categoryType';
import { ProductType } from '@/@types/products/productType';
import HomeProductCard from '@/components/cards/home-product-card';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {
  urlCurrentCat: any;
  category: CategoryType[];
};
export default function MenuProductList(props: Props) {
  const { urlCurrentCat, category } = props;
  const [product, setProduct] = useState<ProductType[]>([]);
  useEffect(() => {
    if (urlCurrentCat === 'تمام موارد' || urlCurrentCat === undefined) {
      axios.get('/api/product/get').then((res) => {
        setProduct(res.data);
      });
    } else {
      axios
        .get(
          `/api/category/${
            category?.filter((i) => i.name === urlCurrentCat)[0]?.id
          }`
        )
        .then((res) => {
          setProduct(res.data?.products);
        });
    }
  }, [urlCurrentCat, category]);

  console.log(product);

  return (
    <Stack alignItems="center" sx={{ mt: 2, mx: 3 }} spacing={6}>
      <Typography variant="h4">{urlCurrentCat || 'تمام موارد'}</Typography>
      <Stack spacing={2} sx={{ width: 1 }}>
        {product?.length === 0 && <Typography>محصولی یافت نشد</Typography>}
        {product?.map((item, index) => (
          <HomeProductCard key={index} data={item} />
        ))}
      </Stack>
    </Stack>
  );
}
