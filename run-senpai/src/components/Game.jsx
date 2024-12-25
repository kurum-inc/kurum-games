import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CONSTANTS } from '../constants';
import { HamsterCharacter } from './HamsterCharacter';
import { StationSign } from './StationSign';
import { useAudio } from '../hooks/useAudio';
import { Sky } from './Sky';
import {BackgroundScene} from './BackgroundScene';
import { GameObstacles } from './GameObstacles';
import { GameTitle } from './GameTitle';
import { StartScreen } from './StartScreen';
// import { useCloudAnimation } from './Sky';

export const Game = () => {

  const VISIBLE_BLOCKS = Math.ceil(window.innerWidth / CONSTANTS.BLOCK_WIDTH) + 1;

  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: CONSTANTS.GROUND_Y });
  const [gameScore, setGameScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [runPhase, setRunPhase] = useState(0);
  const [signPosition, setSignPosition] = useState(50);
  const [buildingsPosition, setBuildingsPosition] = useState(0);
  const [groundBlocks, setGroundBlocks] = useState(() => 
    Array(VISIBLE_BLOCKS).fill(null).map((_, index) => ({
      x: index * CONSTANTS.BLOCK_WIDTH,
      type: 'ground'
    }))
  );
  const { play: playBGM, pause: pauseBGM } = useAudio(`${import.meta.env.VITE_PUBLIC_URL ?? ""}/bgm.mp3`, { loop: true });
  const { play: playJumpSound } = useAudio(`${import.meta.env.VITE_PUBLIC_URL ?? ""}/jump.wav`);
  
  const velocityRef = useRef(0);
  const isJumpingRef = useRef(false);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

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
  }, [playBGM]);

  const resetGame = useCallback(() => {
    setPlayerPosition({ x: 100, y: CONSTANTS.GROUND_Y });
    setGameScore(0);
    setGameOver(false);
    setGameStarted(false);
    setSignPosition(50);
    setBuildingsPosition(0);
    velocityRef.current = 0;
    isJumpingRef.current = false;
    setGroundBlocks(Array(VISIBLE_BLOCKS).fill(null).map((_, index) => ({
      x: index * CONSTANTS.BLOCK_WIDTH,
      type: 'ground'
    })));
    pauseBGM();
  }, []);

  const gameLoop = useCallback((timestamp) => {
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
          setGameOver(true);
        }
      }

      setPlayerPosition(prev => ({ ...prev, y: newY }));
      setGameScore(prev => prev + deltaTime * 0.01);

      // スクロール速度の計算
      const scrollSpeed = deltaTime * 0.3;
      
      // 雲のアップデート
      // updateClouds(deltaTime);
      
      // 駅名標のスクロール
      setSignPosition(prev => prev - scrollSpeed);
      
      // 建物のスクロール
      setBuildingsPosition(prev => prev - scrollSpeed);

      // 地面ブロックのスクロール
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
  }, [gameOver, gameStarted, playerPosition, groundBlocks]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  // 衝突時の処理
  const handleCollision = useCallback(() => {
    setGameOver(true);
    pauseBGM();
  }, [pauseBGM]);

  return (
    <div className="relative w-full h-96 bg-blue-500 overflow-hidden" onClick={handleJump}>
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

      {/* Score */}
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

      {/* Station Sign */}
      {signPosition > -100 && <StationSign position={signPosition} />}

      {/* Ground blocks */}
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

      {/* Player */}
      <div
        className="absolute w-16 h-16 transition-transform"
        style={{
          transform: `translate(${playerPosition.x}px, ${playerPosition.y}px) ${
            isJumpingRef.current ? `rotate(${velocityRef.current * 2}deg)` : ''
          }`,
          zIndex: 10,
          transformOrigin: 'center bottom'
        }}
      >
        <HamsterCharacter 
          isJumping={isJumpingRef.current} 
          runPhase={runPhase}
        />
      </div>

      {/* Game Over */}
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
  );
};