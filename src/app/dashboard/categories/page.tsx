import { CategoryView } from '@/sections/dashboard/categories/view';
import { buildSiteTitle } from '@/utils/build-site-title';
import React from 'react';

export const metadata = {
  title: buildSiteTitle('مدیریت دسته بندی ها'),
};

export default function Page() {
  return <CategoryView />;
}
