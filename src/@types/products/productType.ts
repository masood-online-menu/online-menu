import { CategoryType } from '../category/categoryType';

export type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  discount?: string;
  category: CategoryType;
};
