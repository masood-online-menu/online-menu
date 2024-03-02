import { ProductsEditView } from '@/sections/dashboard/products/view';
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

export default function EditProductPage({ params }: Props) {
  const { id } = params;
  return <ProductsEditView id={id} />;
}
