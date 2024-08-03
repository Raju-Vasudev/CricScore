import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './ScoreBoardDialog.css';
import OverItem from './OverDetailsCard';
import { toggleScoreCard } from '../reducers/features/ScoreCardSlice';

function ScoreBoard() {
  const matchStarted = useSelector((state) => state.scoreCard.matchStarted);
  const showSimpleScoreCard = useSelector((state) => state.scoreCard.showSimpleScoreCard);
  const toggleScoreCardFlag = useSelector((state) => state.scoreCard.toggleScoreCardFlag);
  const dispatch = useDispatch();
  function calculateRunsInOver(over) {
    return over.reduce((acc, curr) => {
      if (typeof curr === 'number') {
        return acc + curr;
      } else if (
        (curr === 'WD' || curr === 'NB') &&
        (isGullyCricket?.EnableExtraRunsForWide || isGullyCricket?.EnableExtraRunsForNoBall)
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }
  function countWicketsInOver(over) {
    return over.filter((d) => d === 'W').length;
  }
  const isGullyCricket = useSelector((state) => state.scoreCard.isGullyCricket);
  const deliveryMapOfEachOver = useSelector(
    (state) => state.scoreCard.innings[state.scoreCard.currentInning].deliveryMapInEachOver,
  );
  const batting = 'batting';
  const bowling = 'bowling';
  const [view, setView] = React.useState(batting);
  const toggleView = (option) => setView(option === bowling ? bowling : batting);
  const handleClose = () => {
    dispatch(toggleScoreCard());
  };

  return (
    <>
      {(matchStarted || showSimpleScoreCard) && toggleScoreCardFlag ? (
        <Dialog
          fullScreen
          open={toggleScoreCardFlag}
          onClose={handleClose}
          aria-labelledby="scoreboard-dialog-title"
          aria-describedby="scoreboard-dialog-description"
        >
          <DialogContent
            sx={{
              margin: '0px',
              backgroundColor: '#f5f5f5',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <div className="scoreboard-scroll" id="scoreboardScroll">
              <Container
                sx={{
                  margin: '0px',
                  backgroundColor: '#f5f5f5',
                  padding: '16px',
                  // border: '2px solid #2196F3',
                  borderRadius: '8px',
                }}
              >
                <Grid container spacing={0}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => toggleView(batting)}
                      style={{ display: view === batting ? 'none' : 'inline-flex' }}
                    >
                      Show Batting statistics
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => toggleView(bowling)}
                      style={{ display: view === bowling ? 'none' : 'inline-flex' }}
                    >
                      Show Bowling statistics
                    </Button>
                  </Grid>
                </Grid>
                {view === batting ? (
                  <Card>
                    <CardContent>
                      <Typography variant="h5">Coming Soon.....</Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent>
                      <Typography variant="h5">Bowling Scorecard</Typography>
                      <List>
                        {deliveryMapOfEachOver.map((over, index) => {
                          const wicketsInOver = countWicketsInOver(over);
                          const runsInOver = calculateRunsInOver(over);
                          console.log('over', over);
                          return (
                            <OverItem
                              key={index}
                              index={index}
                              runsInOver={runsInOver}
                              wicketsInOver={wicketsInOver}
                              over={over}
                            />
                          );
                        })}
                      </List>
                    </CardContent>
                  </Card>
                )}
              </Container>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}

export default ScoreBoard;

