import React, { useEffect } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { CategoryType } from '@/@types/category/categoryType';
import { ProductType } from '@/@types/products/productType';
import moment from 'jalali-moment';
import { useAuthContext } from '@/auth/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

interface Props {
  category: CategoryType[];
  product: ProductType[];
}
export default function HomeOverView(props: Props) {
  const { category, product } = props;
  const { user } = useAuthContext();
  const target = moment(user?.expireDate);
  const today = moment();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Stack sx={{ bgcolor: 'success.main', borderRadius: 1, p: 2 }}>
          <Typography color="common.white" variant="subtitle1">
            محصولات
          </Typography>
          <Stack
            sx={{ width: 1, my: 2 }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h1" color="common.white">
              {product.length || 0}
            </Typography>
            <Typography variant="caption" color="common.white">
              محصول
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack sx={{ bgcolor: 'secondary.main', borderRadius: 1, p: 2 }}>
          <Typography color="common.white" variant="subtitle1">
            دسته بندی ها
          </Typography>
          <Stack
            sx={{ width: 1, my: 2 }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h1" color="common.white">
              {category.length || 0}
            </Typography>
            <Typography variant="caption" color="common.white">
              دسته بندی
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 2 }}>
          <Typography color="common.white" variant="subtitle1">
            اشتراک شما
          </Typography>
          <Stack
            sx={{ width: 1, my: 2 }}
            justifyContent="center"
            alignItems="center"
            //   direction="row"
          >
            <Typography variant="h1" color="common.white">
              {target.diff(today, 'days')}
            </Typography>
            <Typography variant="caption" color="common.white">
              روز دیگر به پایان می رسد
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
