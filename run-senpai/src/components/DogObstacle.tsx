import React from 'react';

interface DogProps {
  x: number;
  phase: number;
}

export const DogObstacle = React.memo(({ x, phase }: DogProps) => {
  const tailWag = Math.sin(phase * 2) * 20;
  const legMove = Math.sin(phase) * 10;
  const barkScale = Math.sin(phase * 3) * 0.1 + 1; // 吠える動きのスケールアニメーション

  return (
    <div className="absolute" style={{ 
      transform: `translateX(${x}px)`, 
      bottom: '32px', 
      zIndex: 3 
    }}>
      {/* 吠える吹き出し */}
      <div 
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '-5px',
          backgroundColor: 'white',
          padding: '3px 6px',
          borderRadius: '8px',
          transform: `scale(${barkScale})`,
          transformOrigin: 'bottom center',
          border: '1px solid #ccc',
          fontSize: '10px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          zIndex: 4,
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        ワン！
        <div style={{
          position: 'absolute',
          bottom: '-4px',
          left: '10px',
          width: '8px',
          height: '8px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderTop: 'none',
          borderLeft: 'none',
          transform: 'rotate(45deg)',
          boxShadow: '2px 2px 2px rgba(0,0,0,0.05)'
        }} />
      </div>
      
      <div className="relative" style={{ width: '24px', height: '24px' }}>  {/* 32px から 24px に縮小 */}
        {/* 胴体 */}
        <div style={{
          position: 'absolute',
          bottom: '6px',           // 8px から 6px に変更
          left: '4px',            // 6px から 4px に変更
          width: '16px',          // 20px から 16px に変更
          height: '10px',         // 14px から 10px に変更
          backgroundColor: '#8B4513',
          borderRadius: '5px'     // 7px から 5px に変更
        }} />

        {/* 頭 */}
        <div style={{
          position: 'absolute',
          bottom: '12px',         // 16px から 12px に変更
          left: '2px',            // 3px から 2px に変更
          width: '10px',          // 14px から 10px に変更
          height: '9px',         // 12px から 9px に変更
          backgroundColor: '#8B4513',
          borderRadius: '4px'     // 6px から 4px に変更
        }} />

        {/* 耳 */}
        <div style={{
          position: 'absolute',
          bottom: '18px',         // 24px から 18px に変更
          left: '3px',            // 4px から 3px に変更
          width: '4px',           // 6px から 4px に変更
          height: '6px',          // 8px から 6px に変更
          backgroundColor: '#8B4513',
          borderRadius: '2px',    // 3px から 2px に変更
          transform: 'rotate(-15deg)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '18px',         // 24px から 18px に変更
          left: '7px',           // 10px から 7px に変更
          width: '4px',           // 6px から 4px に変更
          height: '6px',          // 8px から 6px に変更
          backgroundColor: '#8B4513',
          borderRadius: '2px',    // 3px から 2px に変更
          transform: 'rotate(15deg)'
        }} />

        {/* 目 */}
        <div style={{
          position: 'absolute',
          bottom: '16px',         // 22px から 16px に変更
          left: '4px',            // 6px から 4px に変更
          width: '2px',           // 3px から 2px に変更
          height: '2px',          // 3px から 2px に変更
          backgroundColor: '#000',
          borderRadius: '50%'
        }} />

        {/* 鼻 */}
        <div style={{
          position: 'absolute',
          bottom: '14px',         // 19px から 14px に変更
          left: '2px',            // 3px から 2px に変更
          width: '3px',           // 4px から 3px に変更
          height: '3px',          // 4px から 3px に変更
          backgroundColor: '#000',
          borderRadius: '50%'
        }} />

        {/* 尻尾 */}
        <div style={{
          position: 'absolute',
          bottom: '12px',         // 16px から 12px に変更
          left: '18px',           // 24px から 18px に変更
          width: '6px',           // 8px から 6px に変更
          height: '4px',          // 6px から 4px に変更
          backgroundColor: '#8B4513',
          borderRadius: '2px',    // 3px から 2px に変更
          transform: `rotate(${tailWag}deg)`,
          transformOrigin: 'left center',
          transition: 'transform 0.1s'
        }} />

        {/* 足 */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '6px',            // 8px から 6px に変更
          width: '3px',           // 4px から 3px に変更
          height: '6px',          // 8px から 6px に変更
          backgroundColor: '#8B4513',
          transform: `rotate(${legMove}deg)`,
          transformOrigin: 'top center'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '15px',           // 20px から 15px に変更
          width: '3px',           // 4px から 3px に変更
          height: '6px',          // 8px から 6px に変更
          backgroundColor: '#8B4513',
          transform: `rotate(${-legMove}deg)`,
          transformOrigin: 'top center'
        }} />
      </div>
    </div>
  );
});

export default DogObstacle;