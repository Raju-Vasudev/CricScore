import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

function MatchModeScreen() {
  const { teamDetails, currentInning, matchStarted, totalOvers, target } = useSelector(
    (state) => state.scoreCard,
  );
  const isLongName = teamDetails.some((team) => team.name.length > 15);
  return (
    <div>
      {matchStarted && (
        <Card sx={{ minWidth: 275, margin: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              Match Details
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isLongName ? 'column' : 'row',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <Chip
                label={teamDetails[0].name}
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  color: 'white',
                }}
              />{' '}
              {isLongName ? (
                <Typography variant="h6" sx={{ alignSelf: 'center', margin: '0 10px' }}>
                  vs
                </Typography>
              ) : (
                <Typography variant="h6" sx={{ margin: '0 10px' }}>
                  vs
                </Typography>
              )}
              <Chip
                label={teamDetails[1].name}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  color: 'white',
                }}
              />
            </Box>
            <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
              Total Overs: {totalOvers}
            </Typography>
            {currentInning >= 0 && <Typography variant="h6" align='center'>Target: {target}</Typography>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default MatchModeScreen;
