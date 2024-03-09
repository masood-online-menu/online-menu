import { CategoryType } from '../category/categoryType';
import { ProductType } from '../products/productType';

export type RestaurantType = {
  id: string;
  name: string;
  slogan?: string;
  image: string;
  phone?: string;
  address?: string;
  instagram?: string;
  workTime?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  product: ProductType[];
  category: CategoryType[];
  themeId: ThemeIdType;
};

export type ThemeIdType = 'minimal' | 'harmony' | 'maxi';
