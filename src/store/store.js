import { configureStore } from '@reduxjs/toolkit';
import scoreCardReducer from '../reducers/features/ScoreCardSlice';
import themeReducer from '../reducers/features/ThemeSlice';

export const store = configureStore({
  reducer: {
    scoreCard: scoreCardReducer,
    theme: themeReducer,
  },
});
