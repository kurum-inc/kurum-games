import React, { useState, useEffect, useRef, memo, useCallback } from 'react';

import { Building, BuildingType, Store, Skyscraper } from './Buildings';
import { Person, Actor, PersonType } from './Person';

// ... (既存の型定義とPerson, Store, Skyscraperコンポーネント) ...

interface BackgroundSceneProps {
  gameStarted: boolean;
  gameOver: boolean;
}

export const BackgroundScene: React.FC<BackgroundSceneProps> = ({ gameStarted, gameOver }) => {
  const [position, setPosition] = useState(0);
  const [buildings, setBuildings] = useState<Building[]>(() => 
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

  const positionRef = useRef(0);
  const animationFrameRef = useRef<number>();

  const updatePosition = useCallback((deltaTime: number) => {
    if (!gameStarted || gameOver) return;

    positionRef.current -= deltaTime * 0.1;
    setPosition(positionRef.current);

    // 人物の更新
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

    // 建物の更新も同様に
    setBuildings(prevBuildings => 
      prevBuildings.map(building => {
        const currentX = building.baseX + positionRef.current;
        if (currentX < -window.innerWidth) {
          return {
            ...building,
            baseX: building.baseX + window.innerWidth * 3
          };
        }
        return building;
      })
    );
  }, [gameStarted, gameOver]);

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

  const windowWidth = window.innerWidth;

  return (
    <div className="absolute inset-0 will-change-transform">
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
            <Actor
              key={`person-${index}`}
              x={currentX}
              type={person.type}
            />
          );
        }
        return null;
      })}
    </div>
  );
};