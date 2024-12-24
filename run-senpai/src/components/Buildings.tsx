import React from 'react';

const Shop = ({ x }: { x: number }) => (
  <div className="absolute pixelated" style={{ left: `${x}px`, bottom: '32px' }}>
    <div style={{ 
      width: '32px', 
      height: '48px', 
      imageRendering: 'pixelated',
      background: `
        #874d1c 0 0,
        #874d1c 4px 0,
        #874d1c 8px 0,
        #874d1c 12px 0,
        #6b3e17 0 4px,
        #dba463 4px 4px,
        #dba463 8px 4px,
        #6b3e17 12px 4px
      `.split(',').map(p => `linear-gradient(${p})`).join(',')
    }} />
  </div>
);

const Person = ({ x }: { x: number }) => (
  <div className="absolute pixelated" style={{ left: `${x}px`, bottom: '32px' }}>
    <div style={{ 
      width: '16px', 
      height: '16px', 
      imageRendering: 'pixelated',
      background: `
        #000000 4px 0,
        #000000 8px 0,
        #ffb27f 4px 4px,
        #965340 8px 4px,
        #2244aa 4px 8px,
        #2244aa 8px 8px,
        #000000 4px 12px,
        #000000 8px 12px
      `.split(',').map(p => `linear-gradient(${p})`).join(',')
    }} />
  </div>
);

interface BuildingsProps {
  position: number;
}

export const Buildings: React.FC<BuildingsProps> = ({ position }) => {
  const buildings = [
    { type: 'shop' as const, x: 200 },
    { type: 'person' as const, x: 150 },
    { type: 'person' as const, x: 300 },
    { type: 'shop' as const, x: 400 }
  ];

  return (
    <div className="absolute inset-0 z-5">
      {buildings.map((building, index) => (
        building.type === 'shop' 
          ? <Shop key={index} x={building.x + position} />
          : <Person key={index} x={building.x + position} />
      ))}
    </div>
  );
};