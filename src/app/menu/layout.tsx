import HomeLayout from '@/layouts/home/layout';
import { Metadata } from 'next';
import React, { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'منو آنلاین',
  description: 'Generated by create next app',
};

export default function layout({ children }: PropsWithChildren) {
  return <HomeLayout>{children}</HomeLayout>;
}
