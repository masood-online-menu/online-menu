import { RootState } from '@/redux/store/store';
import ActionsMenu from '@/utils/action-menu';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CategoryDataGrid() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const RestaurantId = useSelector(
    (state: RootState) => state.restaurant.restaurant.id
  );

  const handlePageChange = (params: GridPaginationModel) => {
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/category/get', {
        headers: {
          restaurantId: RestaurantId,
        },
      })
      .then((res) => {
        setRows(res.data);
        setIsLoading(false);
      });
  }, [RestaurantId]);

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
              axios
                .get('/api/category/get', {
                  headers: {
                    restaurantId: RestaurantId,
                  },
                })
                .then((res) => {
                  setRows(res.data);
                  setIsLoading(false);
                });
            }}
            type="category"
          />
        ),
      },
    ],
    [RestaurantId]
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
        }}
      />
    </Box>
  );
}
