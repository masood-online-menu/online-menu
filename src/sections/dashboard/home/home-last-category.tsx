import { Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import Image from 'next/image';
import { CategoryType } from '@/@types/category/categoryType';
import ActionsMenu from '@/utils/action-menu';
import axios from 'axios';
import { paths } from '@/routes/paths';
import { useRouter } from 'next/navigation';

interface Props {
  category: CategoryType[];
}
export default function HomeLastCategory(props: Props) {
  const { category } = props;
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<CategoryType[]>([]);

  const router = useRouter();
  useEffect(() => {
    setRows(category);
  }, [category]);

  const handlePageChange = (params: GridPaginationModel) => {
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'id', headerName: 'کد یکتا', width: 250 },
      {
        field: 'image',
        headerName: 'عکس محصول',
        renderCell: (params: GridRenderCellParams) => (
          <Image src={params.row.image} width={30} height={30} alt="category" />
        ),
      },
      {
        field: 'name',
        headerName: 'نام محصول',
        flex: 1,
        editable: true,
      },
      {
        field: 'Action',
        headerName: 'عملیات',
        align: 'right',
        width: 60,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => (
          <ActionsMenu
            data={params.row}
            reloadData={() => {
              setIsLoading(true);
              axios.get('/api/category/get').then((res) => {
                setRows(res.data);
                setIsLoading(false);
              });
            }}
            type="category"
          />
        ),
      },
    ],
    []
  );
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle1">آخرین دسته بندی ها</Typography>
        <Typography
          variant="subtitle2"
          color="primary.main"
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push(paths.categories.root)}
        >
          دیدن همه
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{ mt: 3 }}
      >
        <DataGrid
          rows={rows}
          loading={isLoading}
          columns={columns}
          pageSizeOptions={[5, 8, 25]}
          paginationModel={{ page, pageSize }}
          disableRowSelectionOnClick
          onPaginationModelChange={handlePageChange}
          sx={{
            height: rows?.length === 0 ? 250 : 'auto',
          }}
        />
      </Stack>
    </Paper>
  );
}
