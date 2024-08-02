import React from 'react';
import { ListItem, ListItemText, Chip, Box, Card, CardContent, Typography } from '@mui/material';
import './OverCard.css';

const OverItem = ({ index, runsInOver, wicketsInOver, over }) => {
  return (
    <Card sx={{ marginBottom: '8px', backgroundColor: '#f5f5f5', padding: '10x' }}>
      <CardContent>
        <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft:'0px'}}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <Chip
              label={`Over ${index + 1}`}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
                fontFamily: 'Arial, sans-serif',
                width: '100px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                marginRight: '8px',
                borderRadius: '5px',
              }}
            />
            <Chip
              label={`Runs: ${runsInOver}`}
              sx={{
                backgroundColor: '#ffeb3b',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '14px',
                marginRight: '8px',
                borderRadius: '5px',
              }}
            />
            <Chip
              label={`Wickets: ${wicketsInOver}`}
              sx={{
                backgroundColor: '#ffeb3b',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '14px',
                borderRadius: '5px',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems:'center' }}>
            {over.map((delivery, index) => (
              <div key={index} className="circle">{delivery}</div>
            ))}
          </Box>
        </ListItem>
      </CardContent>
    </Card>
  );
};

export default OverItem;
