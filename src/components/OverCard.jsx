import React from 'react';
import { ListItem, ListItemText, Chip, Box, Card, CardContent } from '@mui/material';
import './ScoreBoard.css';

const OverItem = ({ index, runsInOver, wicketsInOver, over }) => {
  return (
    <Card sx={{ marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <ListItem key={index}>
          <ListItemText
            primary={
              <div className="over-count">
                <Chip
                  label={`Over ${index + 1}`}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    fontFamily: 'Arial, sans-serif',
                    width: '175px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'left',
                    justifyContent: 'left',
                    fontSize: '20px',
                  }}
                />
              </div>
            }
            secondary={
              <>
                <Chip
                  label={`Runs: ${runsInOver} , Wickets: ${wicketsInOver}`}
                  sx={{ margin: '6px', marginLeft: '0px', backgroundColor: '#ffeb3b', color: '#000', fontWeight: 'bold' }}
                />
                <Box className="over-details" sx={{ display: 'flex', flexWrap: 'wrap' , gap: '4px'}}>
                  {over.map((delivery, index) => (
                    <>
                      <div className="circle">{delivery}</div>
                    </>
                  ))}
                </Box>
              </>
            }
          />
        </ListItem>
      </CardContent>
    </Card>
  );
};

export default OverItem;
