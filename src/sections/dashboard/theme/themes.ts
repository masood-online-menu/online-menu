import { ThemeIdType } from '@/@types/restaurant/restaurantType';

export const ThemesData: ThemesDataType[] = [
  {
    id: '1',
    name: 'minimal',
    title: 'مینیمال',
    image: '/assets/images/images/theme.png',
    status: 'default',
  },
  {
    id: '2',
    name: 'harmony',
    title: 'هارمونی',
    image: '/assets/images/images/theme.png',
    status: 'new',
  },
  {
    id: '3',
    name: 'maxi',
    title: 'مکسی',
    image: '/assets/images/images/theme.png',
    status: 'special',
  },
];

export type ThemesDataType = {
  id: string;
  name: ThemeIdType;
  title: string;
  image: string;
  status?: 'new' | 'special' | 'default';
};
