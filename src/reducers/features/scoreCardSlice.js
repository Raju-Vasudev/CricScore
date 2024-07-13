
import { createSlice } from '@reduxjs/toolkit';

export const scoreCardSlice = createSlice({
  name: 'scoreCard',
  initialState: {
   innings: [
    {
      runs: 0,
      wickets: 0,
      overs: [],
      extras: {
        byes: 0,
        legByes: 0,
        noBalls: 0,
        wides: 0,
        penalties: 0
      },
      totalOvers: 0,
      currentOvers: 0,
    },
    {
      runs: 0,
      wickets: 0,
      overs: [],
      extras: {
        byes: 0,
        legByes: 0,
        noBalls: 0,
        wides: 0,
        penalties: 0
      },
      totalOvers: 0,
      currentOvers: 0,
      target: 0
    }
   ],
   currentInning: 0,
   teams:{
    batting: '',
    bowling: ''
   },
  },
  reducers: {
    incrementRuns: (state, action) => {
      state.innings[state.currentInning].runs += action.payload;
    },
    addWicket: (state) => {
      state.innings[state.currentInning].wickets += 1
    },
    addBall: (state) => {
      state.innings[state.currentInning].currentOvers += 1;
    },
    addExtra: (state, action) => {
      const { type, runs } = action.payload;
      state.innings[state.currentInning].extras[type] += 1;
      state.innings[state.currentInning].runs += runs;
      if (type === 'byes' || type === 'legByes') {
        state.innings[state.currentInning].currentOvers -= 1;
      }
    },
    switchInnings: (state) => {
      state.currentInning = 1;
    },
    setTarget: (state, action) => {
      state.innings[1].target = action.payload;
    },
  },
});

export const { incrementRuns, addWicket, addBall, addExtra, switchInnings, setTarget } = scoreCardSlice.actions;

export default scoreCardSlice.reducer;
