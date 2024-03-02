import { ConfirmDialog } from '@/components/custom-dialog';
import Iconify from '@/components/iconify';
import { paths } from '@/routes/paths';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

type ActionsMenuProps = {
  data?: any | undefined;
  reloadData: () => void;
  type: 'product' | 'category';
};

export default function ActionsMenu({
  data,
  reloadData,
  type,
}: ActionsMenuProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openActionMenu = Boolean(menuAnchor);
  const router = useRouter();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const handleEditData = useCallback(() => {
    if (!data) return;
    if (type === 'product') {
      router.push(paths.products.edit(data.id));
    } else if (type === 'category') {
      router.push(paths.categories.edit(data.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleDeleteData = useCallback(async () => {
    if (!data) return;
    try {
      await axios.post(
        type === 'product' ? '/api/product/delete' : '/api/category/delete',
        { id: data.id }
      );
      reloadData();
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
    <>
      <IconButton onClick={openMenu}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        onClose={closeMenu}
        open={openActionMenu}
        // sx={{ width: 250 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={openDeleteDialog}>
          <Iconify icon="bxs:trash" sx={{ mr: 1 }} />
          حذف
        </MenuItem>
        <MenuItem onClick={handleEditData}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
          ویرایش
        </MenuItem>
      </Menu>
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
    </>
  );
}
