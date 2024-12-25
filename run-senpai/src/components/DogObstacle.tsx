import React from 'react';

interface DogProps {
  x: number;
  phase: number;
}

export const DogObstacle = React.memo(({ x, phase }: DogProps) => {
  const tailWag = Math.sin(phase * 2) * 20;
  const legMove = Math.sin(phase) * 10;

  return (
    <div className="absolute" style={{ 
      transform: `translateX(${x}px)`, 
      bottom: '32px', 
      zIndex: 3 
    }}>
      <div className="relative" style={{ width: '32px', height: '32px' }}>  {/* 48px から 32px に変更 */}
        {/* 胴体 */}
        <div style={{
          position: 'absolute',
          bottom: '8px',           // 12px から 8px に変更
          left: '6px',            // 8px から 6px に変更
          width: '20px',          // 32px から 20px に変更
          height: '14px',         // 20px から 14px に変更
          backgroundColor: '#8B4513',
          borderRadius: '7px'     // 10px から 7px に変更
        }} />

        {/* 頭 */}
        <div style={{
          position: 'absolute',
          bottom: '16px',         // 24px から 16px に変更
          left: '3px',            // 4px から 3px に変更
          width: '14px',          // 20px から 14px に変更
          height: '12px',         // 18px から 12px に変更
          backgroundColor: '#8B4513',
          borderRadius: '6px'     // 8px から 6px に変更
        }} />

        {/* 耳 */}
        <div style={{
          position: 'absolute',
          bottom: '24px',         // 36px から 24px に変更
          left: '4px',            // 6px から 4px に変更
          width: '6px',           // 8px から 6px に変更
          height: '8px',          // 12px から 8px に変更
          backgroundColor: '#8B4513',
          borderRadius: '3px',    // 4px から 3px に変更
          transform: 'rotate(-15deg)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '24px',         // 36px から 24px に変更
          left: '10px',           // 14px から 10px に変更
          width: '6px',           // 8px から 6px に変更
          height: '8px',          // 12px から 8px に変更
          backgroundColor: '#8B4513',
          borderRadius: '3px',    // 4px から 3px に変更
          transform: 'rotate(15deg)'
        }} />

        {/* 目 */}
        <div style={{
          position: 'absolute',
          bottom: '22px',         // 32px から 22px に変更
          left: '6px',            // 8px から 6px に変更
          width: '3px',           // 4px から 3px に変更
          height: '3px',          // 4px から 3px に変更
          backgroundColor: '#000',
          borderRadius: '50%'
        }} />

        {/* 鼻 */}
        <div style={{
          position: 'absolute',
          bottom: '19px',         // 28px から 19px に変更
          left: '3px',            // 4px から 3px に変更
          width: '4px',           // 6px から 4px に変更
          height: '4px',          // 6px から 4px に変更
          backgroundColor: '#000',
          borderRadius: '50%'
        }} />

        {/* 尻尾 */}
        <div style={{
          position: 'absolute',
          bottom: '16px',         // 24px から 16px に変更
          left: '24px',           // 36px から 24px に変更
          width: '8px',           // 12px から 8px に変更
          height: '6px',          // 8px から 6px に変更
          backgroundColor: '#8B4513',
          borderRadius: '3px',    // 4px から 3px に変更
          transform: `rotate(${tailWag}deg)`,
          transformOrigin: 'left center',
          transition: 'transform 0.1s'
        }} />

        {/* 足 */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '8px',            // 12px から 8px に変更
          width: '4px',           // 6px から 4px に変更
          height: '8px',          // 12px から 8px に変更
          backgroundColor: '#8B4513',
          transform: `rotate(${legMove}deg)`,
          transformOrigin: 'top center'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '20px',           // 30px から 20px に変更
          width: '4px',           // 6px から 4px に変更
          height: '8px',          // 12px から 8px に変更
          backgroundColor: '#8B4513',
          transform: `rotate(${-legMove}deg)`,
          transformOrigin: 'top center'
        }} />
      </div>
    </div>
  );
});

export default DogObstacle;