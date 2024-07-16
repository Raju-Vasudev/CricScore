import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './DeliveryMap.css';

function DeliveryMap({ deliveries, updateDeliveries }) {
  const containerRef = React.useRef(null);
  const maxDotsPerRow = 6;
  const svgWidth = 400;
  const rowHeight = 50;
  const dotRadius = 15;
  const spaceBetween = svgWidth / maxDotsPerRow;
  const numberOfRows = Math.ceil(deliveries.length / maxDotsPerRow);
  const svgHeight = numberOfRows * rowHeight;
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  // Adjusted function to calculate the position of each dot based on row direction
  const calculatePosition = (index) => {
    const row = Math.floor(index / maxDotsPerRow);
    const col = index % maxDotsPerRow;
    const isRowEven = row % 2 === 0;
    let x;
    if (isRowEven) {
      x = col * spaceBetween + spaceBetween / 2;
    } else {
      x = svgWidth - (col * spaceBetween + spaceBetween / 2); // Reverse direction for odd rows
    }
    const y = row * rowHeight + rowHeight / 2;
    return { x, y };
  };

  // Adjusted function to draw lines between dots with alternating directions
  const drawLines = (index) => {
    const lines = [];
    if (index > 0) {
      // Ensure not the first dot
      const { x, y } = calculatePosition(index);
      const prevIndex = index - 1;
      const { x: prevX, y: prevY } = calculatePosition(prevIndex);

      // Calculate direction vector
      const dx = x - prevX;
      const dy = y - prevY;
      // Calculate distance
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Normalize direction vector
      const nx = dx / distance;
      const ny = dy / distance;
      // Calculate offset
      const offsetX = nx * dotRadius;
      const offsetY = ny * dotRadius;

      // Adjust start and end points by the offset
      const adjustedStartX = prevX + offsetX;
      const adjustedStartY = prevY + offsetY;
      const adjustedEndX = x - offsetX;
      const adjustedEndY = y - offsetY;

      lines.push(
        <line
          key={`line-${index}`}
          x1={adjustedStartX}
          y1={adjustedStartY}
          x2={adjustedEndX}
          y2={adjustedEndY}
          stroke="white"
        />,
      );
    }
    return lines;
  };

  React.useEffect(() => {
    const lastDot = containerRef.current.lastChild;
    lastDot.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [deliveries]);

  const handleCircleClick = (index) => {
    handleClickOpen(index);
  };

  const handleClickOpen = (index) => {
    setOpenDialog(true);
    setSelectedItemIndex(index);
  };

  const handleConfirmDelete = () => {
    // const isConfirmed = window.confirm('Are you sure you want to delete this delivery?');
    // if (isConfirmed) {
    //   updateDeliveries(index);
    // }
    updateDeliveries(selectedItemIndex);
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const renderDialogBox = () => {
    return (
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography sx={{ color: 'red' }}>
              You cannot modify but only delete, it is irreversible. Are you sure you want to delete
              this delivery?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <div className="dotContainer" ref={containerRef}>
        <svg width={svgWidth} height={svgHeight} style={{ border: '1px solid black' }}>
          {deliveries.map((delivery, index) => {
            const { x, y } = calculatePosition(index);
            const lines = drawLines(index);

            return (
              <React.Fragment key={index}>
                {lines}
                <circle
                  cx={x}
                  cy={y}
                  r={dotRadius}
                  fill="white"
                  onClick={() => handleCircleClick(index)}
                />
                <text
                  x={x}
                  y={y + dotRadius / 2 - 5}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {delivery}
                </text>
              </React.Fragment>
            );
          })}
        </svg>
      </div>
      {renderDialogBox()}
    </>
  );
}

export default DeliveryMap;
