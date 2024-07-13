import { configureStore } from '@reduxjs/toolkit';
import scoreCardReducer from '../reducers/features/ScoreCardSlice';

export const store = configureStore({
  reducer: {
    scoreCard: scoreCardReducer,
  },
});
