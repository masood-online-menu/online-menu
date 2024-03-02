import { RestaurantType } from '@/@types/restaurant/restaurantType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantState {
  restaurant: RestaurantType;
}

const initialState: RestaurantState = {
  restaurant: {
    id: 0,
    name: '',
    slogan: '',
    image: '',
    phone: '',
    address: '',
    instagram: '',
    workTime: '',
    color: 'primary',
  },
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<RestaurantType>) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
