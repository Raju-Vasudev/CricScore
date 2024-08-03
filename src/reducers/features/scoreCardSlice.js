import { createSlice } from '@reduxjs/toolkit';

const initialInningState = {
  runs: 0,
  wickets: 0,
  totalBallsBowled: 0,
  completedOvers: 0,
  extras: {
    byes: 0,
    legByes: 0,
    noBalls: 0,
    wides: 0,
    penalties: 0,
  },
  totalOvers: 0,
  deliveryMapInEachOver: [],
};

const initialState = {
  innings: [initialInningState, { ...initialInningState }],
  currentInning: 0,
  teamDetails: [
    {
      name: '',
      players: [],
      totalPlayers: 11,
    },
    {
      name: '',
      players: [],
      totalPlayers: 11,
    },
  ],
  matchStarted: false,
  totalOvers: 0,
  inningsCompleted: false,
  matchCompleted: false,
  target: 0,
  showSimpleScoreCard: false,
  isGullyModeCricketMode: {
    EnableExtraRunsForWide: false,
    EnableExtraRunsForNoBall: false,
  },
  isOverCompleted: false,
  isScoreEdited: false,
  toggleScoreCardFlag: false,
  winnerMessage: '',
  batFirstTeam: '',
  bowlFirstTeam: '',
};
const calculateWinner = (state) => {
  const teamAScore = state.innings[0].runs;
  const teamBScore = state.innings[1].runs;
  if (teamAScore > teamBScore) {
    const runDifference = teamAScore - teamBScore;
    const runWord = runDifference === 1 ? 'run' : 'runs';
    state.winnerMessage = `Team ${state.teamDetails[0].name} won by ${runDifference} ${runWord}`;
  } else if (teamAScore < teamBScore) {
    const runDifference = state.target - teamBScore;
    const runWord = runDifference === 1 ? 'run' : 'runs';
    state.winnerMessage = `Team ${state.teamDetails[1].name} won by ${runDifference} ${runWord}`;
    const oversLeft = state.totalOvers - state.innings[1].completedOvers;
    const overWord = oversLeft === 1 ? 'over' : 'overs';
    state.winnerMessage = `Team ${state.teamDetails[1].name}`;
  } else {
    state.winnerMessage = 'Match tied';
  }
};

export const scoreCardSlice = createSlice({
  name: 'scoreCard',
  initialState,
  reducers: {
    incrementRuns: (state, action) => {
      state.innings[state.currentInning].runs += action.payload;
      if (state.currentInning === 1) {
        if (state.innings[1].runs > state.target) {
          calculateWinner(state); 
          state.matchCompleted = true;
          state.inningsCompleted = true;
        }
      }
    },
    addWicket: (state) => {
      state.innings[state.currentInning].wickets += 1;
    },
    addBall: (state) => {
      if (state.isScoreEdited) {
        state.isScoreEdited = false;
        const overAndBalls = state.innings[state.currentInning].completedOvers
          .toString()
          .split('.');
        const externalOvers = overAndBalls[0] ? parseInt(overAndBalls[0]) : 0;
        const externalBalls = overAndBalls[1] ? parseInt(overAndBalls[1]) : 0;
        const totalBallsFromCompletedOvers = externalBalls + externalOvers * 6;
        state.innings[state.currentInning].totalBallsBowled = totalBallsFromCompletedOvers + 1;
      } else {
        state.innings[state.currentInning].totalBallsBowled += 1;
      }
      const overs = Math.floor(state.innings[state.currentInning].totalBallsBowled / 6);
      const balls = state.innings[state.currentInning].totalBallsBowled % 6;
      const oc = overs + balls / 10;
      state.innings[state.currentInning].completedOvers = oc;
      if (balls === 0 && state.innings[state.currentInning].totalBallsBowled !== 0) {
        state.isOverCompleted = true;
      }
      if (
        state.totalOvers > 0 &&
        state.innings[state.currentInning].completedOvers >= state.totalOvers
      ) {
        if (state.currentInning === 0) {
          state.inningsCompleted = true;
          state.target = state.innings[0].runs + 1;
          state.currentInning = 1;
        } else if (state.currentInning === 1) {
          state.inningsCompleted = true;
          calculateWinner(state);
          state.matchCompleted = true;
        }
      }
    },
    addExtra: (state, action) => {
      const { type, runs } = action.payload;
      if (
        state.isGullyModeCricketMode.EnableExtraRunsForWide &&
        state.isGullyModeCricketMode.EnableExtraRunsForNoBall
      ) {
        state.innings[state.currentInning].extras[type] += 1;
        state.innings[state.currentInning].runs += runs;
      }
      // if (type === 'byes' || type === 'legByes') {
      //   state.innings[state.currentInning].currentOvers -= 1;
      // }
    },
    switchInnings: (state) => {
      state.currentInning = 1;
    },
    setTarget: (state, action) => {
      state.innings[1].target = action.payload;
    },
    decrementRuns: (state, action) => {
      state.innings[state.currentInning].runs -= action.payload;
    },
    decrementWickets: (state) => {
      state.innings[state.currentInning].wickets -= 1;
    },
    decrementBall: (state) => {
      if (state.innings[state.currentInning].currentOvers > 0) {
        state.innings[state.currentInning].currentOvers -= 1;

        // const balls = state.innings[state.currentInning].currentOvers % 6;
        // const overs = Math.floor(state.innings[state.currentInning].currentOvers / 6);
        // if (balls === 5) {
        //   state.innings[state.currentInning].totalOvers = overs;
        //   state.innings[state.currentInning].overs.pop();
        // }
      }
    },
    decrementExtra: (state, action) => {
      const { type, runs } = action.payload;
      if (state.innings[state.currentInning].extras[type] > 0) {
        state.innings[state.currentInning].extras[type] -= 1;
        state.innings[state.currentInning].runs -= runs;
        if (type === 'byes' || type === 'legByes') {
          state.innings[state.currentInning].currentOvers += 1;
        }
      }
    },
    reset: (state) => {
      const showSimpleScoreCard = state.showSimpleScoreCard;
      const isGullyModeCricketMode = state.isGullyModeCricketMode;
      const matchStarted = state.matchStarted;
      const currentInning = state.currentInning;
      const teamDetails = state.teamDetails;
      const totalOvers = state.totalOvers;
      return {
        ...initialState,
        showSimpleScoreCard,
        isGullyModeCricketMode,
        matchStarted,
        currentInning,
        teamDetails,
        totalOvers,
      };
    },
    startMatch: (state, action) => {
      state.matchStarted = action.payload.newMatch;
      state.teamDetails = action.payload.teamDetails;
      state.totalOvers = action.payload.totalOvers;
      state.currentInning = action.payload.currentInning;
      state.innings[0].totalOvers = action.payload.totalOvers;
      state.batFirstTeam = action.payload.teamDetails[0].name;
      state.bowlFirstTeam = action.payload.teamDetails[1].name;
    },
    startSimpleScoreCard: (state, action) => {
      state.showSimpleScoreCard = true;
      state.isGullyModeCricketMode.EnableExtraRunsForNoBall =
        action.payload.EnableExtraRunsForNoBall;
      state.isGullyModeCricketMode.EnableExtraRunsForWide = action.payload.EnableExtraRunsForWide;
    },
    setDeliveryMapInEachOver: (state, action) => {
      state.innings[state.currentInning].deliveryMapInEachOver.push(action.payload);
      state.isOverCompleted = false;
    },
    editScoreCard: (state, action) => {
      state.innings[state.currentInning].runs = action.payload.runs;
      state.innings[state.currentInning].wickets = action.payload.wickets;
      state.innings[state.currentInning].completedOvers = action.payload.overs;
      state.isScoreEdited = true;
    },
    toggleScoreCard: (state) => {
      state.toggleScoreCardFlag = !state.toggleScoreCardFlag;
    },
    startSecondInning: (state) => {
      state.currentInning = 1;
      state.innings[1].totalOvers = state.totalOvers;
      state.inningsCompleted = false;
    },
  },
});

export const {
  editScoreCard,
  startSimpleScoreCard,
  startMatch,
  reset,
  incrementRuns,
  addWicket,
  addBall,
  addExtra,
  switchInnings,
  setTarget,
  decrementBall,
  decrementExtra,
  decrementWickets,
  decrementRuns,
  setDeliveryMapInEachOver,
  toggleScoreCard,
  startSecondInning,
} = scoreCardSlice.actions;

export default scoreCardSlice.reducer;

