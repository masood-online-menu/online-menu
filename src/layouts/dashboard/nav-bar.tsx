import Iconify from '@/components/iconify';
import NavList from '@/components/navList/nav-list';
import { RootState } from '@/redux/store/store';
import { IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

export default function NavBar() {
  const restaurant = useSelector(
    (state: RootState) => state.restaurant.restaurant
  );

  return (
    <Stack sx={{ width: 240, minWidth: 240, py: 5.2, px: 7.5 }}>
      <Stack alignItems="center" spacing={2}>
        <Stack alignItems="end" sx={{ width: 1 }}>
          <IconButton
            sx={{
              bgcolor: 'white',
              boxShadow: ' 0px 2px 5px 0px rgba(38, 51, 77, 0.03)',
            }}
          >
            <Iconify icon="charm:menu-meatball" color="#C3CAD9" />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            width: 130,
            height: 130,
            borderRadius: '50%',
            border: '2px solid #DADEE6',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            sx={{
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <Image
              src={restaurant?.image || '/assets/images/images/RLogo.jpg'}
              alt="logo"
              width={110}
              height={110}
            />
          </Stack>
        </Stack>
        <Typography variant="subtitle1" color="grey.600" sx={{ pb: 3 }}>
          {restaurant?.name}
        </Typography>
        <NavList />
      </Stack>
    </Stack>
  );
}
