import { MenuView } from '@/sections/menu/view';
import React from 'react';

type Props = {
  searchParams: { cat: any };
};
export default function MenuPage({ searchParams }: Props) {
  const { cat } = searchParams;

  return <MenuView urlCurrentCat={cat} />;
}
