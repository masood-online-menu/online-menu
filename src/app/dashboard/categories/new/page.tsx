import { CategoryNewView } from '@/sections/dashboard/categories/view';
import { buildSiteTitle } from '@/utils/build-site-title';
import React from 'react';

export const metadata = {
  title: buildSiteTitle('افزودن دسته بندی جدید'),
};

export default function NewCategoryPage() {
  return <CategoryNewView />;
}
