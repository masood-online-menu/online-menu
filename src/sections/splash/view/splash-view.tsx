'use client';

import { RestaurantType } from '@/@types/restaurant/restaurantType';
import { setColor } from '@/redux/slices/setting';
import { RootState } from '@/redux/store/store';
import { paths } from '@/routes/paths';
import { Button, Stack } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SplashView() {
  const [restaurant, setRestaurant] = useState<RestaurantType[]>([]);

  const color = useSelector((state: RootState) => state.setting.color);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/restaurant/get').then((res) => {
      setRestaurant(res.data);
      dispatch(setColor(res.data[0].color));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stack
      sx={{ height: '100vh', overflowY: 'hidden' }}
      alignItems="center"
      justifyContent="space-around"
    >
      <Image
        src={restaurant[0]?.image}
        alt="Sally"
        width={300}
        height={300}
        style={{ borderRadius: '50%' }}
      />
      <Stack spacing={1}>
        <Button
          variant="outlined"
          size="large"
          sx={{ fontFamily: 'IranSans', minWidth: 300 }}
          onClick={() => router.push(paths.information)}
          color={color}
        >
          اطلاعات کافه
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ fontFamily: 'IranSans', minWidth: 300 }}
          onClick={() => router.push(paths.menu.root('تمام موارد'))}
          color={color}
        >
          منوی {restaurant[0]?.name}
        </Button>
      </Stack>
    </Stack>
  );
}
