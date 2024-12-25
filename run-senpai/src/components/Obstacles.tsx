import React, { memo } from 'react';

type ObstacleType = 'box' | 'sign' | 'cone' | 'barrel';

interface ObstacleProps {
  x: number;
  type: ObstacleType;
}

const Obstacle = memo(({ x, type }: ObstacleProps) => {
  switch (type) {
    case 'box':
      return (
        <div className="absolute" style={{ 
          transform: `translateX(${x}px)`, 
          bottom: '32px', 
          zIndex: 3 
        }}>
          <div className="relative" style={{ 
            width: '24px', 
            height: '24px', 
            backgroundColor: '#ED8936',
            border: '2px solid #C05621'
          }} />
        </div>
      );

    case 'sign':
      return (
        <div className="absolute" style={{ 
          transform: `translateX(${x}px)`, 
          bottom: '32px', 
          zIndex: 3 
        }}>
          <div className="relative" style={{ width: '20px', height: '32px' }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '8px',
              width: '4px',
              height: '20px',
              backgroundColor: '#4A5568'
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              width: '20px',
              height: '16px',
              backgroundColor: '#ECC94B',
              border: '2px solid #D69E2E',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#000',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              !
            </div>
          </div>
        </div>
      );

    case 'cone':
      return (
        <div className="absolute" style={{ 
          transform: `translateX(${x}px)`, 
          bottom: '32px', 
          zIndex: 3 
        }}>
          <div className="relative" style={{ 
            width: '16px', 
            height: '24px',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            backgroundColor: '#F56565',
            borderBottom: '2px solid #C53030'
          }}>
            <div style={{
              position: 'absolute',
              top: '8px',
              width: '100%',
              height: '4px',
              backgroundColor: '#FFF',
              opacity: 0.8
            }} />
          </div>
        </div>
      );

    case 'barrel':
      return (
        <div className="absolute" style={{ 
          transform: `translateX(${x}px)`, 
          bottom: '32px', 
          zIndex: 3 
        }}>
          <div className="relative" style={{ 
            width: '24px', 
            height: '32px', 
            backgroundColor: '#2B6CB0',
            border: '2px solid #2C5282',
            borderRadius: '2px'
          }}>
            <div style={{
              position: 'absolute',
              top: '4px',
              width: '100%',
              height: '2px',
              backgroundColor: '#4299E1'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '4px',
              width: '100%',
              height: '2px',
              backgroundColor: '#4299E1'
            }} />
          </div>
        </div>
      );
  }
});

export { Obstacle, type ObstacleType };