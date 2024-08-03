import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Card, CardContent, Grid, List } from '@mui/material';
import './ScoreBoard.css';
import OverItem from './OverCard';

function ScoreBoard() {
  const matchStarted = useSelector((state) => state.scoreCard.matchStarted);
  const showSimpleScoreCard = useSelector((state) => state.scoreCard.showSimpleScoreCard);
  const toggleScoreCardFlag = useSelector((state) => state.scoreCard.toggleScoreCardFlag);
  
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
  return (
    <>
      {(matchStarted || showSimpleScoreCard) && toggleScoreCardFlag ? (
        <div className="scoreboard-scroll" id='scoreboardScroll'>
          <Container
            sx={{
              margin: '0px',
              backgroundColor: '#f5f5f5',
              padding: '16px',
              border: '2px solid #2196F3',
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
                  {/* <Typography variant="h5">Batting Scorecard</Typography> */}
                  <Typography variant="h5">Coming Soon.....</Typography>
                  {/* Batting scorecard details */}
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
      ) : null}
    </>
  );
}

export default ScoreBoard;

