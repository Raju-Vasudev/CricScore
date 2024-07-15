import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startMatch, startSimpleScoreCard } from '../reducers/features/ScoreCardSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from '@mui/material';

const MatchDetails = () => {
  const { teamDetails, currentInning, matchStarted, totalOvers, target, showSimpleScoreCard } = useSelector(state => state.scoreCard);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [teamOneName, setTeamOneName] = useState('');
  const [teamTwoName, setTeamTwoName] = useState('');
  const [totalMatchOvers, setTotalMatchOvers] = useState(0);
  
  const handleStartMatch = () => {
    if(teamOneName === '' || teamTwoName === ''){
      handleOpenSnackbar();
    };
      const newMatchDetails = {
        newMatch: true,
        teamDetails: [
        {
        name: teamOneName? teamOneName : "A",
        players: [],
        totalPlayers: 11
        },
        {
        name: teamTwoName? teamTwoName : "B",
        players: [],
        totalPlayers: 11
        }
        ],
        currentInning: 0,
        totalOvers: totalMatchOvers? totalMatchOvers : 0,
      };
    dispatch(startMatch(newMatchDetails));
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (skip = null) => {
    if(skip){
      handleStartMatch();
      handleOpenSnackbar();
    }
    setOpen(false);
    setTeamOneName('');
    setTeamTwoName('');
  };
  const handleCancel = () => {
    handleClose();
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleOpenSnackbar = () => {
    setSnackbarOpen(true);
  }
  const MatchDetailsDialog = () =>{
    return (
      <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Team Names</DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          margin="dense"
          id="teamOne"
          label="Team 1 Name"
          fullWidth
          value={teamOneName}
          onChange={(e) => setTeamOneName(e.target.value)}
          variant='standard'
          />
          <TextField
          margin="dense"
          id="teamTwo"
          label="Team 2 Name"
          fullWidth
          value={teamTwoName}
          onChange={(e) => setTeamTwoName(e.target.value)}
          variant='standard'
          />
          <TextField
          margin="dense"
          id="totalMatchOvers"
          label="Total Overs"
          fullWidth
          value={totalMatchOvers}
          onChange={(e) => setTotalMatchOvers(e.target.value)}
          variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleStartMatch}>Start</Button>
          <Button onClick={()=> handleClose("skip")}>Skip</Button>
        </DialogActions>
      </Dialog>
      </>
    );
  }
  const SnackBar =() =>{
    return (
      <Snackbar
          open={snackbarOpen}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message="Starting match with default team names"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          ContentProps={
            {style: {
              backgroundColor: 'blue',
              color: 'white',
              fontWeight: 'bold'
            }}
          }
      />
    )
  }
  const handleStartSimpleScoreCard = () => {
    dispatch(startSimpleScoreCard());
  }
  return (
    <>
    {(!matchStarted && !showSimpleScoreCard) && <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>Start New Match</Button>}
    <br />
    {(!matchStarted && !showSimpleScoreCard) && <Button variant='contained' color='primary' onClick={() => handleStartSimpleScoreCard()}>Create Simple Score Card</Button>}
    {matchStarted && 
      <div>
        <h2>Match Details</h2>
        <h3>Team 1: {teamDetails[0].name}</h3>
        <h3>Team 2: {teamDetails[1].name}</h3>
        <h3>Total Overs: {totalOvers}</h3>
        {currentInning > 0 && <h3>Target: {target}</h3>}
      </div>
    }
    {MatchDetailsDialog()}
    {SnackBar()}
    </>
  )
}

export default MatchDetails