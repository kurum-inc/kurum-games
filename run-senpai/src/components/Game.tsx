import React, { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
import { CONSTANTS } from '../constants';
import { HamsterCharacter } from './HamsterCharacter';
import { StationSign } from './StationSign';
import { useAudio } from '../hooks/useAudio';
import { Sky } from './Sky';
import { BackgroundScene } from './BackgroundScene';
import { GameObstacles } from './GameObstacles';
import { GameTitle } from './GameTitle';

interface Position {
  x: number;
  y: number;
}

interface GroundBlock {
  x: number;
  type: 'ground' | 'hole';
}

interface AudioControl {
  play: () => void;
  pause: () => void;
}

export const Game: React.FC = () => {
  const VISIBLE_BLOCKS = Math.ceil(window.innerWidth / CONSTANTS.BLOCK_WIDTH) + 1;

  const [level, setLevel] = useState<number>(1);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 100, y: CONSTANTS.GROUND_Y });
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [runPhase, setRunPhase] = useState<number>(0);
  const [signPosition, setSignPosition] = useState<number>(50);
  const [buildingsPosition, setBuildingsPosition] = useState<number>(0);
  const [groundBlocks, setGroundBlocks] = useState<GroundBlock[]>(() => 
    Array(VISIBLE_BLOCKS).fill(null).map((_, index) => ({
      x: index * CONSTANTS.BLOCK_WIDTH,
      type: 'ground'
    }))
  );

  const { play: playBGM, pause: pauseBGM } = useAudio(`${import.meta.env.VITE_PUBLIC_URL ?? ""}/bgm.mp3`, { loop: true }) as AudioControl;
  const { play: playJumpSound } = useAudio(`${import.meta.env.VITE_PUBLIC_URL ?? ""}/jump.wav`) as AudioControl;
  const { play: gameOverSound } = useAudio(`${import.meta.env.VITE_PUBLIC_URL ?? ""}/gameover.mp3`) as AudioControl;

  const velocityRef = useRef<number>(0);
  const isJumpingRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const handleJump = useCallback(() => {
    if (!gameStarted) return;
    if (!isJumpingRef.current && !gameOver) {
      velocityRef.current = CONSTANTS.JUMP_FORCE;
      isJumpingRef.current = true;
      playJumpSound();
    }
  }, [gameOver, gameStarted, playJumpSound]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setGameScore(0);
    setPlayerPosition({ x: 100, y: CONSTANTS.GROUND_Y });
    velocityRef.current = 0;
    isJumpingRef.current = false;
    lastTimeRef.current = 0;
    playBGM();

    // ga event tracking
    if (window.gtag) {
      window.gtag('event', 'game_start', {
        event_category: 'game',
        event_label: 'game_start'
      });
    }
  }, [playBGM]);

  const resetGame = useCallback(() => {
    setPlayerPosition({ x: 100, y: CONSTANTS.GROUND_Y });
    setGameScore(0);
    setLevel(1);
    setGameOver(false);
    setGameStarted(false);
    setSignPosition(50);
    setBuildingsPosition(0);
    velocityRef.current = 0;
    isJumpingRef.current = false;
    setGroundBlocks(Array(VISIBLE_BLOCKS).fill(null).map((_, index) => ({
      x: index * CONSTANTS.BLOCK_WIDTH,
      type: 'ground' as const
    })));
    pauseBGM();

    // ga event tracking
    if (window.gtag) {
      window.gtag('event', 'game_reset', {
        event_category: 'game',
        event_label: 'game_reset'
      });
    }
  }, []);

  const handleCollision = useCallback(() => {
    setGameOver(true);
    pauseBGM();
    gameOverSound();

    // ga event tracking
    if (window.gtag) {
      window.gtag('event', 'game_over', {
        event_category: 'game',
        event_label: 'game_over',
        value: Math.floor(gameScore)
      });
    }
  }, [pauseBGM, gameOverSound, gameScore]);

  const gameLoop = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (!gameOver && gameStarted) {
      setRunPhase(prev => (prev + deltaTime * CONSTANTS.RUN_SPEED) % (Math.PI * 2));

      velocityRef.current += CONSTANTS.GRAVITY;
      let newY = playerPosition.y + velocityRef.current;

      const playerBlockIndex = Math.floor(playerPosition.x / CONSTANTS.BLOCK_WIDTH);
      const currentBlock = groundBlocks.find(block => 
        Math.floor(block.x / CONSTANTS.BLOCK_WIDTH) === playerBlockIndex
      );

      if (currentBlock) {
        if (currentBlock.type === 'ground' && newY >= CONSTANTS.GROUND_Y) {
          newY = CONSTANTS.GROUND_Y;
          velocityRef.current = 0;
          isJumpingRef.current = false;
        } else if (currentBlock.type === 'hole' && newY >= CONSTANTS.GROUND_Y + CONSTANTS.BLOCK_HEIGHT) {
          handleCollision();
        }
      }

      setPlayerPosition(prev => ({ ...prev, y: newY }));

      setGameScore(prev => {
        const newScore = prev + deltaTime * 0.01;
        const newLevel = Math.floor(newScore / 100) + 1;
        if (newLevel !== level) {
          setLevel(newLevel);
        }
        return newScore;
      });

      const scrollSpeed = deltaTime * 0.3;
      
      setSignPosition(prev => prev - scrollSpeed);
      setBuildingsPosition(prev => prev - scrollSpeed);

      setGroundBlocks(prev => {
        const newBlocks = prev.map(block => ({
          ...block,
          x: block.x - scrollSpeed
        }));

        const filteredBlocks = newBlocks.filter(block => block.x > -CONSTANTS.BLOCK_WIDTH);

        while (filteredBlocks.length < VISIBLE_BLOCKS) {
          const lastBlock = filteredBlocks[filteredBlocks.length - 1];
          const newX = lastBlock ? lastBlock.x + CONSTANTS.BLOCK_WIDTH : 0;
          
          const isHole = Math.random() < CONSTANTS.HOLE_PROBABILITY;
          filteredBlocks.push({
            x: newX,
            type: isHole ? 'hole' : 'ground'
          });
        }

        return filteredBlocks;
      });
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, gameStarted, playerPosition, groundBlocks, level, handleCollision]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

return (
  <div className="w-full h-screen flex items-center justify-center bg-gray-900 pb-8">
    <div 
      className="relative w-full h-96 bg-blue-500 overflow-hidden" 
      onClick={handleJump}
      onTouchStart={(e) => {
        e.preventDefault();
        handleJump();
      }}
    >
      <Sky />
      <BackgroundScene
        gameStarted={gameStarted}
        gameOver={gameOver}
      />
      <GameObstacles 
        gameStarted={gameStarted} 
        gameOver={gameOver}
        onCollision={handleCollision}
        playerPosition={playerPosition}
      />

      {gameStarted && (
        <div className="absolute top-4 left-4 text-2xl font-bold text-white">
          Score: {Math.floor(gameScore)}
        </div>
      )}

      {!gameStarted && !gameOver && (
        <>
          <GameTitle />
          <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '200px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded-lg hover:bg-green-600 transition-colors"
              style={{
                textShadow: '2px 2px 0 #000',
                border: '4px solid #000'
              }}
            >
              START!
            </button>
          </div>
        </>
      )}

      {signPosition > -100 && <StationSign position={signPosition} />}

      <div className="absolute bottom-0 left-0 right-0">
        {groundBlocks.map((block, index) => (
          <div
            key={`ground-${index}`}
            style={{
              position: 'absolute',
              left: `${block.x}px`,
              bottom: 0,
              width: `${CONSTANTS.BLOCK_WIDTH}px`,
              height: `${CONSTANTS.BLOCK_HEIGHT}px`,
              backgroundColor: block.type === 'ground' ? '#8B4513' : 'transparent',
              borderTop: block.type === 'ground' ? '4px solid #A0522D' : 'none',
              imageRendering: 'pixelated'
            }}
          />
        ))}
      </div>

      <HamsterCharacter 
        isJumping={isJumpingRef.current} 
        runPhase={runPhase}
        x={playerPosition.x}
        y={playerPosition.y}
      />

      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 30 }}>
          <div className="text-center">
            <h2 className="text-white text-4xl mb-4">Game Over!</h2>
            <p className="text-white text-2xl mb-4">Score: {Math.floor(gameScore)}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};