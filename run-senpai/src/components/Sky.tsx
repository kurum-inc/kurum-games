import React, { useState, useCallback } from 'react';

const Cloud = ({ x, y }: { x: number; y: number }) => (
  <div className="absolute pixelated" style={{ left: `${x}px`, top: `${y}px`, zIndex: 1 }}>
    <div style={{ 
      width: '32px', 
      height: '16px', 
      imageRendering: 'pixelated',
      background: `
        #ffffff 4px 0,
        #ffffff 8px 0,
        #ffffff 12px 0,
        #ffffff 0 4px,
        #ffffff 4px 4px,
        #ffffff 8px 4px,
        #ffffff 12px 4px,
        #ffffff 16px 4px
      `.split(',').map(p => `linear-gradient(${p})`).join(',')
    }} />
  </div>
);

interface SkyProps {
  updateClouds: (deltaTime: number) => void;
}

export const Sky: React.FC = () => {
  const [clouds, setClouds] = useState(() => 
    Array(5).fill(0).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 0.5
    }))
  );

  const updateCloudsPosition = (deltaTime: number) => {
    setClouds(prevClouds => 
      prevClouds.map(cloud => {
        let newX = cloud.x - cloud.speed;
        if (newX < -50) {
          newX = window.innerWidth + 50;
          if (Math.random() < 0.3) {
            return {
              x: newX,
              y: Math.random() * 100,
              speed: 0.5 + Math.random() * 0.5
            };
          }
        }
        return { ...cloud, x: newX };
      })
    );
  };

  return (
    <div className="absolute inset-0 z-0">
      {clouds.map((cloud, index) => (
        <Cloud key={index} x={cloud.x} y={cloud.y} />
      ))}
    </div>
  );
};

export const useCloudAnimation = () => {
  const [clouds, setClouds] = useState(() => 
    Array(5).fill(0).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 0.5
    }))
  );

  const updateClouds = useCallback((deltaTime: number) => {
    setClouds(prevClouds => 
      prevClouds.map(cloud => {
        let newX = cloud.x - cloud.speed;
        if (newX < -50) {
          newX = window.innerWidth + 50;
          if (Math.random() < 0.3) {
            return {
              x: newX,
              y: Math.random() * 100,
              speed: 0.5 + Math.random() * 0.5
            };
          }
        }
        return { ...cloud, x: newX };
      })
    );
  }, []);

  return { clouds, updateClouds };
};