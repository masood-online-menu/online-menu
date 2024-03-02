import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SettingState {
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const initialState: SettingState = {
  color: 'primary',
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setColor: (
      state,
      action: PayloadAction<
        'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
      >
    ) => {
      state.color = action.payload;
    },
  },
});

export const { setColor } = settingSlice.actions;
export default settingSlice.reducer;
