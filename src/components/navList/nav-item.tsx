import { Stack } from '@mui/material';
import React from 'react';
import Iconify, { IconifyProps } from '../iconify';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

interface Props {
  active?: any;
  title: string;
  icon: IconifyProps;
  link?: string;
  action?: () => void;
}
export default function NavItem(props: Props) {
  const { active, title, icon, link, action } = props;
  const router = useRouter();
  const color = useSelector((state: RootState) => state.setting.color);

  return (
    <Stack
      direction="row"
      justifyContent="start"
      alignItems="center"
      sx={{
        p: 2,
        bgcolor: active ? `${color}.main` : 'transparent',
        borderRadius: 1,
        cursor: 'pointer',
        color: active
          ? 'white'
          : title === 'خروج'
          ? 'error.main'
          : 'text.primary',
        fontWeight: active && '700',
        gap: 3,
        '&:hover': {
          bgcolor: active ? `${color}.main` : `${color}.lighter`,
        },
      }}
      onClick={link ? () => router.push(link || '/') : action}
    >
      <Iconify icon={icon} width={20} height={20} />
      {title || 'test'}
    </Stack>
  );
}
