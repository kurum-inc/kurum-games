import { useRef, useEffect } from 'react';

export const useAudio = (url: string) => {
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audio.current = new Audio(url);
    audio.current.loop = true;
    
    return () => {
      if (audio.current) {
        audio.current.pause();
        audio.current = null;
      }
    };
  }, [url]);

  const play = () => {
    if (audio.current) {
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