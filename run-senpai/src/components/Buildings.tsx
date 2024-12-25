import React, { useState, useEffect, useRef, memo, useCallback } from 'react';

// 型定義
export type BuildingType = 'skyscraper' | 'restaurant' | 'cafe' | 'shop';

export interface Building {
  type: BuildingType;
  baseX: number;
  height?: number;
}

export interface StoreProps {
  x: number;
  type: 'restaurant' | 'cafe' | 'shop';
}

export interface SkyscraperProps {
  x: number;
  height?: number;
}

export const Store = memo(({ x, type }: StoreProps) => {
  const colors = {
    restaurant: { main: '#f56565', accent: '#e53e3e' },
    cafe: { main: '#4299e1', accent: '#3182ce' },
    shop: { main: '#48bb78', accent: '#38a169' }
  };

  return (
    <div className="absolute" style={{ transform: `translateX(${x}px)`, bottom: '32px', zIndex: 2 }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        position: 'relative',
        imageRendering: 'pixelated'
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '32px',
          background: colors[type].main
        }} />
        <div style={{
          position: 'absolute',
          bottom: '24px',
          width: '100%',
          height: '16px',
          background: colors[type].accent,
          borderTop: '2px solid #ffffff'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '16px',
          width: '16px',
          height: '24px',
          background: '#2d3748'
        }} />
      </div>
    </div>
  );
});

export const Skyscraper = memo(({ x, height = 120 }: SkyscraperProps) => {
  return (
    <div className="absolute" style={{ transform: `translateX(${x}px)`, bottom: '32px', zIndex: 2 }}>
      <div style={{ 
        width: '64px', 
        height: `${height}px`, 
        position: 'relative',
        imageRendering: 'pixelated',
        background: '#718096'
      }}>
        {Array.from({ length: Math.floor(height / 16) }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            bottom: `${i * 16}px`,
            width: '100%',
            height: '8px',
            background: '#A0AEC0'
          }} />
        ))}
      </div>
    </div>
  );
});
