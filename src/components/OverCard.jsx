import React from 'react';
import { Chip, Box, Card, CardContent } from '@mui/material';
import './OverCard.css';

const OverItem = ({ index, runsInOver, wicketsInOver, over }) => {
  return (
    <Card sx={{ marginBottom: '8px', backgroundColor: '#f5f5f5', padding: '10x' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '6px',
            flexWrap: 'wrap',
            marginLeft: '0px',
          }}
        >
          <Chip
            label={`Over ${index + 1}`}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              fontFamily: 'Arial, sans-serif',
              width: { xs: '70px', sm: '100px' },
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: { xs: '10px', sm: '16px' },
              fontWeight: 'bold',
              marginRight: { xs: '4px', sm: '8px' },
              borderRadius: '5px',
              marginBottom: { xs: '4px', sm: '0px' },
            }}
          />
          <Chip
            label={`Runs: ${runsInOver}`}
            sx={{
              backgroundColor: '#ffeb3b',
              color: '#000',
              fontWeight: 'bold',
              fontSize: { xs: '10px', sm: '14px' },
              marginRight: { xs: '4px', sm: '8px' },
              borderRadius: '5px',
              marginBottom: { xs: '4px', sm: '0px' },
            }}
          />
          <Chip
            label={`Wickets: ${wicketsInOver}`}
            sx={{
              backgroundColor: '#ffeb3b',
              color: '#000',
              fontWeight: 'bold',
              fontSize: { xs: '10px', sm: '14px' },
              borderRadius: '5px',
              marginBottom: { xs: '4px', sm: '0px' },
              marginRight: { xs: '0px', sm: '8px' },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {over.map((delivery, index) => (
            <div key={index} className="circle">
              {delivery}
            </div>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default OverItem;
