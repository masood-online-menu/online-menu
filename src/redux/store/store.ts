import { configureStore } from '@reduxjs/toolkit';
import { checkoutSlice } from '../slices/checkout';
import { settingSlice } from '../slices/setting';
import { restaurantSlice } from '../slices/restaurant';

export const store = configureStore({
  reducer: {
    checkout: checkoutSlice.reducer,
    setting: settingSlice.reducer,
    restaurant: restaurantSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
