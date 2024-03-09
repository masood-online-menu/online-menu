import { ThemeView } from '@/sections/dashboard/theme/view';
import { buildSiteTitle } from '@/utils/build-site-title';
import React from 'react';

export const metadata = {
  title: buildSiteTitle('مدیریت قالب ها'),
};

export default function ThemePage() {
  return <ThemeView />;
}
