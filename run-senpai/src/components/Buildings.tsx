import React, { useState, useEffect, useRef, memo, useCallback } from 'react';

// 型定義
type PersonType = 'walking' | 'standing' | 'student' | 'business';
type BuildingType = 'skyscraper' | 'restaurant' | 'cafe' | 'shop';

interface Person {
  type: PersonType;
  baseX: number;
}

interface Building {
  type: BuildingType;
  baseX: number;
  height?: number;
}

interface BackgroundObjectsProps {
  position: number;
  people: Person[];
  buildings: Building[];
}

// 個別のコンポーネントの型定義
interface PersonComponentProps {
  x: number;
  type: PersonType;
}

interface StoreProps {
  x: number;
  type: 'restaurant' | 'cafe' | 'shop';
}

interface SkyscraperProps {
  x: number;
  height?: number;
}

// コンポーネント定義
const Person = memo(({ x, type }: PersonComponentProps) => {
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

const Store = memo(({ x, type }: StoreProps) => {
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

const Skyscraper = memo(({ x, height = 120 }: SkyscraperProps) => {
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

const BackgroundObjects = memo(({ position, people, buildings}: BackgroundObjectsProps) => {
  const windowWidth = window.innerWidth;

  return (
    <>
      {buildings.map((building, index) => {
        const currentX = building.baseX + position;
        if (currentX > -100 && currentX < windowWidth + 100) {
          switch (building.type) {
            case 'skyscraper':
              return <Skyscraper key={`building-${index}`} x={currentX} height={building.height} />;
            case 'restaurant':
              return <Store key={`building-${index}`} x={currentX} type="restaurant" />;
            case 'cafe':
              return <Store key={`building-${index}`} x={currentX} type="cafe" />;
            case 'shop':
              return <Store key={`building-${index}`} x={currentX} type="shop" />;
          }
        }
        return null;
      })}

      {people.map((person, index) => {
        const currentX = person.baseX + position;
        if (currentX > -50 && currentX < windowWidth + 50) {
          return (
            <Person
              key={`person-${index}`}
              x={currentX}
              type={person.type}
            />
          );
        }
        return null;
      })}
    </>
  );
});

export const Buildings: React.FC = () => {
  const [position, setPosition] = useState(0);
  const positionRef = useRef(0);
  const animationFrameRef = useRef<number>();
  
  const [buildings] = useState<Building[]>(() => 
    Array.from({ length: 20 }).map((_, index) => ({
      type: ['skyscraper', 'restaurant', 'cafe', 'shop'][Math.floor(Math.random() * 4)] as BuildingType,
      baseX: index * 200 + Math.random() * 100,
      height: Math.random() * 80 + 80
    }))
  );

  const [people, setPeople] = useState<Person[]>(() => 
    Array.from({ length: 15 }).map(() => ({
      type: ['walking', 'standing', 'student', 'business'][Math.floor(Math.random() * 4)] as PersonType,
      baseX: Math.random() * window.innerWidth * 3
    }))
  );

  const updatePosition = useCallback((deltaTime: number) => {
    positionRef.current -= deltaTime * 0.1;
    setPosition(positionRef.current);

    setPeople(prevPeople => 
      prevPeople.map(person => {
        const currentX = person.baseX + positionRef.current;
        if (currentX < -window.innerWidth) {
          return {
            type: ['walking', 'standing', 'student', 'business'][Math.floor(Math.random() * 4)] as PersonType,
            baseX: person.baseX + window.innerWidth * 3
          };
        }
        return person;
      })
    );
  }, []);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      updatePosition(deltaTime);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updatePosition]);

  return (
    <div className="absolute inset-0 will-change-transform">
      <BackgroundObjects 
        position={position} 
        people={people} 
        buildings={buildings} 
      />
    </div>
  );
};