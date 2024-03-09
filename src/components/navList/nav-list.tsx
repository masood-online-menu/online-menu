import { Stack } from '@mui/material';
import React from 'react';
import NavItem from './nav-item';
import { usePathname } from 'next/navigation';
import { paths } from '@/routes/paths';
import { useAuthContext } from '@/auth/hooks';

export default function NavList() {
  const pathname = usePathname();
  const { logout } = useAuthContext();
  return (
    <Stack
      sx={{
        border: '2px solid #DADEE6',
        width: 1,
        borderRadius: 2,
        overflow: 'hidden',
        p: 2,
      }}
      spacing={1}
    >
      <NavItem
        active={pathname === '/dashboard'}
        title="داشبورد"
        icon="ic:round-dashboard"
        link={paths.dashboard}
      />
      <NavItem
        active={pathname === '/dashboard/products'}
        title="مدیریت محصولات"
        icon="gridicons:product"
        link={paths.products.root}
      />
      <NavItem
        active={pathname === '/dashboard/categories'}
        title="مدیریت دسته بندی ها"
        icon="ic:round-category"
        link="/dashboard/categories"
      />
      <NavItem
        active={pathname === '/dashboard/management'}
        title="مدیریت رستوران"
        icon="material-symbols:manage-accounts-rounded"
        link="/dashboard/management"
      />
      <NavItem
        active={pathname === '/dashboard/theme'}
        title="مدیریت قالب"
        icon="gridicons:themes"
        link="/dashboard/theme"
      />
      <NavItem title="خروج" icon="mingcute:exit-fill" action={logout} />
    </Stack>
  );
}
