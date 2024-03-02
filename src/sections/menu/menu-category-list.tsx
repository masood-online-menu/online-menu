import { CategoryType } from '@/@types/category/categoryType';
import CategoryCard from '@/components/cards/category-card';
import { Stack } from '@mui/material';
import React from 'react';

type Props = {
  urlCurrentCat: any;
  category: CategoryType[];
};
export default function MenuCategoryList(props: Props) {
  const { urlCurrentCat, category } = props;
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{ mt: 5 }}
    >
      <CategoryCard
        active={!urlCurrentCat || urlCurrentCat === 'تمام موارد'}
        data={{
          id: 1,
          name: 'تمام موارد',
          image: '/assets/images/images/MenuIcon.png',
        }}
      />
      {category.map((item, index) => (
        <CategoryCard
          key={index}
          active={item.name === urlCurrentCat}
          data={item}
        />
      ))}
    </Stack>
  );
}
