import { ProductType } from '@/@types/products/productType';
import { paths } from '@/routes/paths';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { ConfirmDialog } from '../custom-dialog';

interface Props {
  data: ProductType;
}
export default function ProductCard(props: Props) {
  const { data } = props;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const router = useRouter();

  const handleDeleteData = useCallback(async () => {
    if (!data) return;
    try {
      await axios.post('/api/product/delete', { id: data.id });
      closeDeleteDialog();
      toast.success('با موفقیت حذف شد');
    } catch (error) {
      console.log(error);
      toast.error('خطایی رخ داده');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  return (
    <Paper sx={{ p: 1 }}>
      <Box
        width={200}
        height={200}
        sx={{ borderRadius: 1, overflow: 'hidden' }}
      >
        <Image
          src={data.image}
          width={200}
          height={200}
          alt={data.name}
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        {data.name}
      </Typography>
      <Typography variant="subtitle2" sx={{ my: 1 }}>
        قیمت: {data.price}
      </Typography>
      <Divider />
      <Stack sx={{ mt: 1 }} direction="row" gap={1}>
        <Button
          variant="contained"
          color="success"
          sx={{ fontFamily: 'IranSans' }}
          onClick={() => router.push(paths.products.edit(data.id))}
        >
          ویرایش
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ fontFamily: 'IranSans' }}
          onClick={openDeleteDialog}
        >
          حذف
        </Button>
      </Stack>
      <ConfirmDialog
        open={deleteDialogOpen}
        title="حذف"
        onClose={closeDeleteDialog}
        content={
          <>
            آیا از حذف<strong> {data?.name} </strong> مطمعن هستید؟
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteData}
            sx={{ fontFamily: 'IranSans' }}
          >
            حذف
          </Button>
        }
      />
    </Paper>
  );
}
