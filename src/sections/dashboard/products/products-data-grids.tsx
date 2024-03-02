import ActionsMenu from '@/utils/action-menu';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

export default function ProductsDataGrids() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (params: GridPaginationModel) => {
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/product/get').then((res) => {
      setRows(res.data);
      setIsLoading(false);
    });
  }, []);

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'id', headerName: 'کد یکتا', width: 250 },
      {
        field: 'image',
        headerName: 'عکس محصول',
        renderCell: (params: GridRenderCellParams) => (
          <Image
            src={params.row.image}
            width={30}
            height={30}
            alt="Product"
            style={{ borderRadius: '50%' }}
          />
        ),
      },
      {
        field: 'name',
        headerName: 'نام محصول',
        width: 150,
        editable: true,
      },

      {
        field: 'description',
        headerName: 'توضیحات',
        width: 300,
        editable: true,
      },
      {
        field: 'category',
        headerName: 'دسته بندی ها',
        width: 150,
        valueGetter: (params: GridValueGetterParams) => {
          return params.row.category.name;
        },
      },
      {
        field: 'price',
        headerName: 'قیمت (تومان)',
        type: 'number',
        width: 110,
        editable: true,
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params: GridValueGetterParams) => {
          if (!params.row.price) {
            return 0;
          } else {
            return params.row.price;
          }
        },
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
            type="product"
            reloadData={() => {
              setIsLoading(true);
              axios.get('/api/product/get').then((res) => {
                setRows(res.data);
                setIsLoading(false);
              });
            }}
          />
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ width: 1 }}>
      <DataGrid
        rows={rows}
        loading={isLoading}
        columns={columns}
        pageSizeOptions={[5, 8, 25]}
        paginationModel={{ page, pageSize }}
        disableRowSelectionOnClick
        onPaginationModelChange={handlePageChange}
        sx={{
          height: rows.length === 0 ? 250 : 'auto',
          minHeight: 250,
        }}
      />
    </Box>
  );
}
