import { useRef, useEffect } from 'react';

export const useAudio = (url: string, { loop = false } = {}) => {
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audio.current = new Audio(url);
    audio.current.loop = loop;
    
    return () => {
      if (audio.current) {
        audio.current.pause();
        audio.current = null;
      }
    };
  }, [url, loop]);

  const play = () => {
    if (audio.current) {
      // 効果音の場合は最初から再生し直す
      if (!loop) {
        audio.current.currentTime = 0;
      }
      audio.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    }
  };

  const pause = () => {
    if (audio.current) {
      audio.current.pause();
    }
  };

  return { play, pause };
};