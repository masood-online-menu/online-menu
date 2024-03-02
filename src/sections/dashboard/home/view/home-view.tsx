'use client';

import { Stack } from '@mui/material';
import React, { useState } from 'react';
import HomeOverView from '../home-over-view';
import HomeLastProduct from '../home-last-product';
import HomeLastCategory from '../home-last-category';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

export default function HomeView() {
  const restaurant = useSelector(
    (state: RootState) => state.restaurant.restaurant
  );

  return (
    <Stack spacing={5}>
      <HomeOverView
        product={restaurant?.product || []}
        category={restaurant?.category || []}
      />
      <HomeLastProduct product={restaurant?.product || []} />
      <HomeLastCategory category={restaurant?.category || []} />
    </Stack>
  );
}
