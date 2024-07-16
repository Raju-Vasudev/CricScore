import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function MatchModeScreen() {
  const { teamDetails, currentInning, matchStarted, totalOvers, target } = useSelector(
    (state) => state.scoreCard,
  );
  const [expanded, setExpanded] = React.useState(true);
  const isLongName = teamDetails.some((team) => team.name.length > 15);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      {matchStarted && (
        <Card
          sx={{
            minWidth: 275,
            maxHeight: expanded ? 'auto' : '45px',
            margin: 1,
            paddingBottom: '10px',
          }}
        >
          <CardContent
            sx={{
              padding: expanded ? '16px' : '8px',
              margin: expanded ? '2px' : '1px',
              // display: !expanded ? 'flex' : '',
              justifyContent: !expanded ? 'center' : '',
              alignItems: !expanded ? 'center' : '',
              height: !expanded ? '100%' : '',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2px',
                margin: '2px',
              }}
            >
              <Typography variant="h6" component="div" align="center">
                Match Details
              </Typography>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse
              in={expanded}
              timeout="auto"
              unmountOnExit
              TransitionProps={{
                timeout: 'auto',
                easing: {
                  enter: 'ease-in-out',
                  exit: 'ease-in-out',
                },
              }}
            >
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
              {currentInning > 0 && (
                <Typography variant="h6" align="center">
                  Target: {target}
                </Typography>
              )}
            </Collapse>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default MatchModeScreen;
