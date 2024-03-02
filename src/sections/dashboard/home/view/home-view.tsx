'use client';

import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HomeOverView from '../home-over-view';
import HomeLastProduct from '../home-last-product';
import HomeLastCategory from '../home-last-category';
import axios from 'axios';
import { ProductType } from '@/@types/products/productType';
import { CategoryType } from '@/@types/category/categoryType';

export default function HomeView() {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>([]);

  useEffect(() => {
    axios.get('/api/product/get').then((res) => {
      setProduct(res.data);
    });
    axios.get('/api/category/get').then((res) => {
      setCategory(res.data);
    });
  }, []);
  return (
    <Stack spacing={5}>
      <HomeOverView product={product} category={category} />
      <HomeLastProduct product={product} />
      <HomeLastCategory category={category}/>
    </Stack>
  );
}
