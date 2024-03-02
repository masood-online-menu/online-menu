import { CategoryType } from '@/@types/category/categoryType';
import { RootState } from '@/redux/store/store';
import { paths } from '@/routes/paths';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
  active?: boolean;
  data: CategoryType;
};
export default function CategoryCard(props: Props) {
  const { active, data } = props;

  const router = useRouter();
  const color = useSelector((state: RootState) => state.setting.color);

  const handleSelectCategory = () => {
    router.push(paths.menu.root(data.name));
  };

  return (
    <Stack
      sx={{
        width: 80,
        height: 90,
        borderRadius: 1,
        boxShadow: '-8px 15px 50px -8px rgba(156,156,156,0.9)',
        bgcolor: active ? `${color}.darker` : 'transparent',
      }}
      justifyContent="center"
      alignItems="center"
      spacing={1}
      onClick={handleSelectCategory}
    >
      <Image
        src={data.image || '/assets/images/images/pizza-test.png'}
        width={80}
        height={80}
        alt="pizza"
        style={{ width: '50%', height: 'auto' }}
      />
      <Typography
        variant="subtitle2"
        color={active ? 'white' : 'text.secondary'}
      >
        {data.name}
      </Typography>
    </Stack>
  );
}
