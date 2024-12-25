import React, { memo } from 'react';

// 型定義
export type PersonType = 'walking' | 'standing' | 'student' | 'business';

export interface Person {
  type: PersonType;
  baseX: number;
}

// 個別のコンポーネントの型定義
interface PersonComponentProps {
  x: number;
  type: PersonType;
}

// コンポーネント定義
export const Actor = memo(({ x, type }: PersonComponentProps) => {
  const getColor = () => {
    switch (type) {
      case 'walking': return '#2B6CB0';
      case 'standing': return '#9C4221';
      case 'student': return '#38A169';
      case 'business': return '#1A365D';
      default: return '#2B6CB0';
    }
  };

  return (
    <div className="absolute" style={{ 
      transform: `translateX(${x}px)`, 
      bottom: '32px', 
      zIndex: 2 
    }}>
      <div className="relative" style={{ width: '16px', height: '24px' }}>
        <div className="absolute" style={{
          top: '0px',
          left: '4px',
          width: '8px',
          height: '8px',
          backgroundColor: '#FFB27F',
          borderRadius: '4px'
        }} />
        <div className="absolute" style={{
          top: '8px',
          left: '2px',
          width: '12px',
          height: '12px',
          backgroundColor: getColor()
        }} />
        <div className="absolute" style={{
          top: '20px',
          left: '4px',
          width: '8px',
          height: '4px',
          backgroundColor: '#2D3748'
        }} />
        {type === 'student' && (
          <div className="absolute" style={{
            top: '-2px',
            left: '2px',
            width: '12px',
            height: '2px',
            backgroundColor: '#4A5568'
          }} />
        )}
        {type === 'business' && (
          <div className="absolute" style={{
            top: '12px',
            left: '12px',
            width: '4px',
            height: '6px',
            backgroundColor: '#718096'
          }} />
        )}
      </div>
    </div>
  );
});
