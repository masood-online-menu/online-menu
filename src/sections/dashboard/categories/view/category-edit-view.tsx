'use client';

import { CategoryType } from '@/@types/category/categoryType';
import { Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryNewEditForm from '../category-new-edit-form';

type Props = {
  id: string;
};

export default function CategoryEditView({ id }: Props) {
  const [current, setCurrent] = useState<CategoryType | null>(null);

  useEffect(() => {
    axios.get(`/api/category/${id}`).then((res) => {
      setCurrent(res.data);
    });
  }, [id]);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h4">
            ویرایش دسته بندی {current && current.name}
          </Typography>
        </Stack>
        <CategoryNewEditForm currentCategory={current!} />
      </Stack>
    </Paper>
  );
}
