'use client';

import { RestaurantType } from '@/@types/restaurant/restaurantType';
import { setColor } from '@/redux/slices/setting';
import MenuHeadline from '@/sections/menu/menu-headline';
import { Stack } from '@mui/material';
import axios from 'axios';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function HomeLayout({ children }: PropsWithChildren) {
  const [restaurant, setRestaurant] = useState<RestaurantType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/restaurant/get').then((res) => {
      setRestaurant(res.data);
      dispatch(setColor(res.data[0].color));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <MenuHeadline data={restaurant[0]} />
      {children}
    </Stack>
  );
}
