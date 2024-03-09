import React from 'react';
import { ThemesData } from './themes';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import Iconify from '@/components/iconify';
import { setTheme } from '@/redux/slices/restaurant';
import { ThemeIdType } from '@/@types/restaurant/restaurantType';
import axios from 'axios';
import { useAuthContext } from '@/auth/hooks';

const ThemeCard = styled(Stack)(({ theme }) => ({
  borderRadius: 8,
  boxShadow: `0 0 24px ${theme.palette.grey[300]}`,
  padding: 16,
  position: 'relative',
}));

const UsedBadge = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 30,
  width: 50,
  height: 50,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
}));

const StatusBadge = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.error.lighter,
  borderRadius: 8,
  padding: theme.spacing(0.2, 1),
  color: theme.palette.common.white,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function ThemeList() {
  const color = useSelector((state: RootState) => state.setting.color);
  const restaurantState = useSelector(
    (state: RootState) => state.restaurant.restaurant
  );
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const handleTheme = async (name: ThemeIdType) => {
    try {
      const res = await axios.post('/api/restaurant/updateTheme', {
        id: restaurantState.id,
        themeId: name,
        userId: user?.id,
      });
      dispatch(setTheme(name));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container spacing={3} sx={{ maxWidth: 1 }}>
      {ThemesData.map((item) => (
        <Grid item xs={12} md={6} key={item.id}>
          <ThemeCard>
            {restaurantState.themeId === item.name && (
              <UsedBadge sx={{ bgcolor: `${color}.main` }}>
                <Iconify
                  icon="material-symbols:new-releases"
                  color="white"
                  width={40}
                />
              </UsedBadge>
            )}
            <Image
              src={item.image}
              alt="@"
              width={1000}
              height={1000}
              style={{
                maxWidth: '100%',
                height: '100%',
              }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={3}>
                <Typography>قالب {item.title}</Typography>
                {item.status !== 'default' && (
                  <StatusBadge>
                    <Iconify
                      icon={
                        item.status === 'new'
                          ? 'mdi:hot'
                          : item.status === 'special'
                          ? 'ic:round-star'
                          : ''
                      }
                      color="white"
                    />
                    <Typography variant="caption">
                      {item.status === 'new' && 'جدید'}
                      {item.status === 'special' && 'ویژه'}
                    </Typography>
                  </StatusBadge>
                )}
              </Stack>
              <Button
                variant="contained"
                sx={{ fontFamily: 'IranSans' }}
                color={color}
                disabled={item.name === restaurantState.themeId}
                onClick={() => handleTheme(item.name)}
              >
                {item.name !== restaurantState.themeId
                  ? 'انتخاب قالب'
                  : 'فعال'}
              </Button>
            </Stack>
          </ThemeCard>
        </Grid>
      ))}
    </Grid>
  );
}
