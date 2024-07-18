import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeliveryMap from './DeliveryMap';

function ScoreBoard() {
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
    <Container>
      <Typography variant="h4" gutterBottom>
        {`Inning - Scorecard`}
      </Typography>
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
            <Typography variant="h5">Batting Scorecard</Typography>
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
                return (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Over ${index + 1}`}
                      secondary={`Runs: ${runsInOver}, Wickets: ${wicketsInOver}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default ScoreBoard;
