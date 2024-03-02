'use client';

import { RestaurantType } from '@/@types/restaurant/restaurantType';
import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: props) {
  const [restaurant, setRestaurant] = useState<RestaurantType[]>([]);

  const theme = useTheme();

  useEffect(() => {
    axios.get('/api/restaurant/get').then((res) => {
      setRestaurant(res.data);
    });
  }, []);
  return (
    <Stack justifyContent="center" direction="row">
      <Stack
        sx={{ width: '50%', bgcolor: '#FFF', height: '100vh' }}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={'/assets/images/svg/auth/Saly-2.svg'}
          alt="Sally"
          width={450}
          height={450}
        />
      </Stack>
      <Stack
        sx={{
          width: '50%',
          bgcolor: theme.palette.primary.light,
          height: '100vh',
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={'/assets/images/svg/auth/Saly-3.svg'}
          alt="Sally"
          width={269}
          height={256}
        />
      </Stack>

      <Stack sx={{ position: 'absolute', top: 31, left: 42 }}>
        <Typography variant="h4" color={theme.palette.primary.darker}>
          <Stack
            sx={{
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <Image
              src={restaurant[0]?.image || '/assets/images/images/RLogo.jpg'}
              alt="logo"
              width={110}
              height={110}
            />
          </Stack>
        </Typography>
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: theme.palette.primary.contrastText,
          p: 4,
          width: 539,
          boxShadow: theme.shadows[10],
          borderRadius: 4,
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}
