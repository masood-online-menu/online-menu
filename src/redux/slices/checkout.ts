import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutState {
  cart: any;
  total: number;
}

const initialState: CheckoutState = {
  cart: [],
  total: 0,
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    setCart: (state, action: PayloadAction<any>) => {
      state.cart = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { setCart, setTotal } = checkoutSlice.actions;
export default checkoutSlice.reducer;
