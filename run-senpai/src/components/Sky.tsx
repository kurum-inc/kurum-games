import React, { useState, useCallback, useEffect } from 'react';

interface Cloud {
  id: number;
  x: number;
  y: number;
  speed: number;
  scale: number;
}

const CloudSprite = ({ x, y, scale }: { x: number; y: number; scale: number }) => (
  <div 
    className="absolute pixelated" 
    style={{ 
      left: `${x}px`, 
      top: `${y}px`, 
      transform: `scale(${scale})`,
      zIndex: 1 
    }}
  >
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

export const Sky: React.FC = () => {
  const [clouds, setClouds] = useState<Cloud[]>(() => 
    Array(5).fill(0).map((_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 150,
      speed: 0.3 + Math.random() * 0.3,
      scale: 0.8 + Math.random() * 0.4
    }))
  );

  const updateClouds = useCallback(() => {
    setClouds(prevClouds => 
      prevClouds.map(cloud => {
        let newX = cloud.x - cloud.speed;
        
        // 画面外に出た場合
        if (newX < -50) {
          // 右端から新しい雲として登場
          return {
            ...cloud,
            x: window.innerWidth + 50,
            y: Math.random() * 150,
            speed: 0.3 + Math.random() * 0.3,
            scale: 0.8 + Math.random() * 0.4
          };
        }
        
        return { ...cloud, x: newX };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(updateClouds, 50);
    return () => clearInterval(interval);
  }, [updateClouds]);

  return (
    <div className="absolute inset-0 z-0">
      {clouds.map(cloud => (
        <CloudSprite 
          key={cloud.id} 
          x={cloud.x} 
          y={cloud.y} 
          scale={cloud.scale}
        />
      ))}
    </div>
  );
};