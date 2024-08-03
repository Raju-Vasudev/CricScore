import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editScoreCard , startSecondInning} from '../reducers/features/ScoreCardSlice';

const ScoreScreen = () => {
  const dispatch = useDispatch();
  const matchStarted = useSelector((state) => state.scoreCard.matchStarted);
  const showSimpleScoreCard = useSelector((state) => state.scoreCard.showSimpleScoreCard);
  const currentInning = useSelector((state) => state.scoreCard.currentInning);
  const innings = useSelector((state) => state.scoreCard.innings);
  const completedOvers = useSelector(
    (state) => state.scoreCard.innings[state.scoreCard.currentInning].completedOvers,
  );
  const inningsCompleted = useSelector((state) => state.scoreCard.inningsCompleted);
  const matchCompleted = useSelector((state) => state.scoreCard.matchCompleted);
  const winnerMessage = useSelector((state) => state.scoreCard.winnerMessage);
  const currentInnings = innings[currentInning];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [runs, setRuns] = useState(currentInnings.runs);
  const [wickets, setWickets] = useState(currentInnings.wickets);
  const [overs, setOvers] = useState(completedOvers);
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setDialogOpen(!dialogOpen);
  };
  const handleRunsChange = (e) => {
    const newValue = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    setRuns(isNaN(newValue) ? 0 : newValue);
  };

  const handleWicketsChange = (e) => {
    const newValue = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    setWickets(isNaN(newValue) ? 0 : newValue);
  };

  const handleOversChange = (e) => {
    let { value } = e.target;
    value = value.replace(/^0+(\d)/, '$1');
    const regex = /^[0-9]*\.?[1-6]?$/;
    if (regex.test(value)) {
      setOvers(value);
    } else if (value === '') {
      setOvers(value);
    }
  };
  const updateScoreAndOvers = () => {
    dispatch(editScoreCard({ runs, wickets, overs }));
    setEditMode(false);
  };

  const startInnings = () => {
    dispatch(startSecondInning());
  };

  React.useEffect(() => {
    setRuns(currentInnings.runs);
    setWickets(currentInnings.wickets);
    setOvers(completedOvers);
  }, [currentInnings, completedOvers]);

  return (
    <>
      {(matchStarted || showSimpleScoreCard) && (
        <>
          {!inningsCompleted ? (
            <div onClick={toggleEditMode}>
              {editMode ? (
                <>
                  <Dialog
                    open={dialogOpen}
                    onClose={toggleEditMode}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Edit Score</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="runs"
                        label="Runs"
                        type="text"
                        fullWidth
                        value={runs}
                        onChange={handleRunsChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <TextField
                        margin="dense"
                        id="wickets"
                        label="Wickets"
                        type="text"
                        fullWidth
                        value={wickets}
                        onChange={handleWicketsChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <TextField
                        margin="dense"
                        id="overs"
                        label="Overs"
                        type="text"
                        fullWidth
                        value={overs}
                        onChange={handleOversChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={toggleEditMode} variant="contained" color="primary">
                        Cancel
                      </Button>
                      <Button onClick={updateScoreAndOvers} variant="contained" color="success">
                        Update
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <>
                  <h2>
                    Score: {currentInnings.runs}/{currentInnings.wickets}
                  </h2>
                  <h2>Overs: {completedOvers}</h2>
                </>
              )}
            </div>
          ) : (
            <>
              {(currentInning && !matchCompleted ) ? (
                <Button
                  variant="contained"
                  color="secondary"
                  className="button2"
                  onClick={() => startInnings()}
                >
                  Start second innings
                </Button>
              ) : (
                <>
                  <h2>{winnerMessage}</h2>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ScoreScreen;
