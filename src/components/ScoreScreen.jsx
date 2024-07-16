import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editScoreCard } from '../reducers/features/ScoreCardSlice';

const ScoreScreen = () => {
  const dispatch = useDispatch();
  const matchStarted = useSelector((state) => state.scoreCard.matchStarted);
  const showSimpleScoreCard = useSelector((state) => state.scoreCard.showSimpleScoreCard);
  const currentInning = useSelector((state) => state.scoreCard.currentInning);
  const innings = useSelector((state) => state.scoreCard.innings);
  const completedOvers = useSelector(
    (state) => state.scoreCard.innings[state.scoreCard.currentInning].completedOvers,
  );
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
    const newValue = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
    setOvers(isNaN(newValue) ? 0 : newValue);
  };
  const updateScoreAndOvers = () => {
    dispatch(editScoreCard({ runs, wickets, overs }));
    setEditMode(false);
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
                <h3>Overs: {completedOvers}</h3>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ScoreScreen;
