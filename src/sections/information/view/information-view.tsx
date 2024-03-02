'use client';

import { RestaurantType } from '@/@types/restaurant/restaurantType';
import Iconify from '@/components/iconify';
import { RootState } from '@/redux/store/store';
import { paths } from '@/routes/paths';
import { Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function InformationView() {
  const [restaurant, setRestaurant] = useState<RestaurantType[]>([]);

  const router = useRouter();
  const color = useSelector((state: RootState) => state.setting.color);

  useEffect(() => {
    axios.get('/api/restaurant/get').then((res) => {
      setRestaurant(res.data);
    });
  }, []);
  return (
    <Stack
      sx={{ height: '100vh', maxHeight: '100vh' }}
      alignItems="center"
      justifyContent="space-around"
    >
      <Stack spacing={2} alignItems="center">
        <Image
          src={restaurant[0]?.image}
          alt="Sally"
          width={300}
          height={300}
          style={{ borderRadius: '50%' }}
        />
        <Typography variant="subtitle1">{restaurant[0]?.slogan}</Typography>
      </Stack>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Iconify icon={'mynaui:telephone-call'} />
          <Typography variant="body1">{restaurant[0]?.phone}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Iconify icon={'mdi:address-marker-outline'} />
          <Typography variant="body1">{restaurant[0]?.address}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Iconify icon={'teenyicons:instagram-outline'} />
          <Link
            href={`https://instagram.com/${restaurant[0]?.instagram}`}
            style={{ textDecoration: 'none' }}
          >
            <Typography variant="body1" color={`${color}.dark`}>
              {restaurant[0]?.instagram}@
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Iconify icon={'clarity:clock-line'} />
          <Typography variant="body1">{restaurant[0]?.workTime}</Typography>
        </Stack>
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
