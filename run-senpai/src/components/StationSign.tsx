import React from 'react';

interface StationSignProps {
  position: number;
}

export const StationSign: React.FC<StationSignProps> = ({ position }) => (
  <div className="absolute" style={{ left: `${position}px`, bottom: '32px', zIndex: 20 }}>
    <div className="flex flex-col items-center">
      <div className="w-4 h-24 bg-gray-700" />
      <div className="absolute bottom-16">
        <div className="bg-white px-4 py-2 border-4 border-blue-900 whitespace-nowrap">
          <span className="text-lg font-bold text-blue-900">ときわ台</span>
        </div>
      </div>
    </div>
  </div>
);