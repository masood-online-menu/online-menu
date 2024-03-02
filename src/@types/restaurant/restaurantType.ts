export type RestaurantType = {
  id: number;
  name: string;
  slogan?: string;
  image: string;
  phone?: string;
  address?: string;
  instagram?: string;
  workTime?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
};
