import { LoginPageView } from '@/sections/auth/view';
import { buildSiteTitle } from '@/utils/build-site-title';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: buildSiteTitle('ورود'),
  description: process.env.NEXT_PUBLIC_APP_SITE_DESCRIPTION,
};
export default function page() {
  return <LoginPageView />;
}
