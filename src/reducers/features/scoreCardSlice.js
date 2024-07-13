
import { createSlice } from '@reduxjs/toolkit';

export const scoreCardSlice = createSlice({
  name: 'scoreCard',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = scoreCardSlice.actions;

export default scoreCardSlice.reducer;
