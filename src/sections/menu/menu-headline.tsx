import { RestaurantType } from '@/@types/restaurant/restaurantType';
import Iconify from '@/components/iconify';
import Image from '@/components/image';
import { Box, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  data: RestaurantType;
}
export default function MenuHeadline(props: Props) {
  const { data: restaurant } = props;
  const theme = useTheme();
  const router = useRouter();

  return (
    <Stack sx={{ position: 'relative' }}>
      <Image
        src="/assets/images/images/Headline.jpg"
        width={2000}
        height={2000}
        alt=""
        sx={{
          objectFit: 'cover',
          width: '100%',
          height: 150,
          borderBottom: `5px solid ${theme.palette.success.darker}`,
        }}
      />
      <Box sx={{ position: 'absolute', top: 100, right: 20 }}>
        <Image
          src={restaurant?.image}
          alt="Sally"
          width={100}
          height={100}
          style={{
            borderRadius: '50%',
            border: `5px solid ${theme.palette.success.darker}`,
          }}
        />
      </Box>
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          bgcolor: 'white',
          border: '1px solid gray',
        }}
        onClick={() => router.push('/')}
      >
        <Iconify icon="eva:arrow-back-fill" />
      </IconButton>
    </Stack>
  );
}
