import { configureStore } from '@reduxjs/toolkit';
import scoreCardReducer from '../reducers/features/scoreCardSlice';

export const store = configureStore({
  reducer: {
    scoreCard: scoreCardReducer,
  },
});
