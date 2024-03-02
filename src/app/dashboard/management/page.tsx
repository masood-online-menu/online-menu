import { ManagementView } from '@/sections/dashboard/management/view';
import { buildSiteTitle } from '@/utils/build-site-title';
import React from 'react';

export const metadata = {
  title: buildSiteTitle('مدیریت رستوران'),
};

export default function ManageMentPage() {
  return <ManagementView />;
}
