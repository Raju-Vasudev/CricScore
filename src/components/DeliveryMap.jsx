import React from 'react';

function DeliveryMap({ deliveries }) {
  const DeliveryMapInEachOver = deliveries;
  const svgWidth = 400;
  const svgHeight = 100;
  const dotRadius = 15;
  const spaceBetween = 50;
  return (
    <svg width={svgWidth} height={svgHeight} style={{ border: '1px solid black' }}>
      {DeliveryMapInEachOver?.map((delivery, index) => {
        const x = (index + 1) * spaceBetween;
        const y = svgHeight / 2;

        const prevX = (index * spaceBetween) + dotRadius;
        const prevY = y;
        return (
          <React.Fragment key={index}>
            {index > 0 && <line x1={prevX} y1={prevY} x2={x} y2={y} style={{ stroke: 'black' }} />}
            <circle cx={x} cy={y} r={dotRadius} fill="white" />
            <text x={x} y={y + (dotRadius / 2) - 5} dominantBaseline="middle" textAnchor="middle" style={{ fontSize: '15px', fontWeight: 'bold', userSelect: 'none' }}>
              {delivery}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
}

export default DeliveryMap;
