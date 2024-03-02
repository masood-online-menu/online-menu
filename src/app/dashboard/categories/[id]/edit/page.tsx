import { CategoryEditView } from '@/sections/dashboard/categories/view';
import { buildSiteTitle } from '@/utils/build-site-title';
import React from 'react';

export const metadata = {
  title: buildSiteTitle('ویرایش محصول'),
};

type Props = {
  params: {
    id: string;
  };
};

export default function EditCategoryPage({ params }: Props) {
  const { id } = params;
  return <CategoryEditView id={id} />;
}
