'use client';

import { Grid, Stack } from '@mui/material';
import MenuCategoryList from '../menu-category-list';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryType } from '@/@types/category/categoryType';
import MenuProductList from '../menu-product-list';

type Props = {
  urlCurrentCat: any;
};
export default function MenuView(props: Props) {
  const { urlCurrentCat } = props;
  const [category, setCategory] = useState<CategoryType[]>([]);

  useEffect(() => {
    axios.get('/api/category/get').then((res) => {
      setCategory(res.data);
    });
  }, []);

  return (
    <Stack>
      <Grid container>
        <Grid item xs={8}>
          <MenuProductList urlCurrentCat={urlCurrentCat} category={category} />
        </Grid>
        <Grid xs={4} item sx={{ mt: 7 }}>
          <MenuCategoryList urlCurrentCat={urlCurrentCat} category={category} />
        </Grid>
      </Grid>
    </Stack>
  );
}
