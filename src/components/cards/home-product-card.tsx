import { ProductType } from '@/@types/products/productType';
import { RootState } from '@/redux/store/store';
import { paths } from '@/routes/paths';
import { Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

interface Props {
  data: ProductType;
}
export default function HomeProductCard(props: Props) {
  const { data } = props;
  const theme = useTheme();
  const color = useSelector((state: RootState) => state.setting.color);
  const router = useRouter();

  const handleMoreInfo = () => {
    router.push(paths.menu.product(data?.id));
  };
  return (
    <Stack
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        width: 1,
        p: 1,
      }}
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Image
        src={data?.image}
        alt={data?.name}
        width={100}
        height={100}
        style={{ width: '100%', height: 'auto', borderRadius: 4 }}
      />
      <Stack
        sx={{ width: 1 }}
        direction="row"
        justifyContent="space-between"
        spacing={1}
      >
        <Typography variant="subtitle1">{data?.name}</Typography>
        <Typography variant="body2" color="error.main" sx={{ minWidth: 70 }}>
          {data?.price.toString().slice(0, -3)} تومان
        </Typography>
      </Stack>
      <Typography variant="caption">
        {data?.description.slice(0, 50)}
        {data.description.length > 50 && '...'}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        sx={{ width: 1 }}
      >
        {/* <Button
          variant="contained"
          fullWidth
          sx={{ fontFamily: 'IranSans' }}
          color={color}
        >
          افزودن به سبد
        </Button> */}
        <Button
          variant="outlined"
          fullWidth
          sx={{ fontFamily: 'IranSans' }}
          color={color}
          onClick={handleMoreInfo}
        >
          اطلاعات بیشتر
        </Button>
      </Stack>
    </Stack>
  );
}
