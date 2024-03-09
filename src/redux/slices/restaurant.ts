import {
  RestaurantType,
  ThemeIdType,
} from '@/@types/restaurant/restaurantType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantState {
  restaurant: RestaurantType;
}

const initialState: RestaurantState = {
  restaurant: {
    id: '0',
    name: '',
    slogan: '',
    image: '',
    phone: '',
    address: '',
    instagram: '',
    workTime: '',
    color: 'primary',
    product: [],
    category: [],
    themeId: 'minimal',
  },
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<RestaurantType>) => {
      state.restaurant = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeIdType>) => {
      state.restaurant.themeId = action.payload;
    },
  },
});

export const { setRestaurant, setTheme } = restaurantSlice.actions;
export default restaurantSlice.reducer;
