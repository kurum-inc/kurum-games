import { useState, useEffect } from "react";

export const GameTitle = () => {
    const [fontSize, setFontSize] = useState({
      go: '48px',
      kurumu: '64px'
    });
   
    useEffect(() => {
      const updateFontSize = () => {
        if (window.innerWidth < 640) {
          setFontSize({
            go: '32px',
            kurumu: '31px'
          });
        } else {
          setFontSize({
            go: '48px',
            kurumu: '52px'
          });
        }
      };
   
      updateFontSize();
      window.addEventListener('resize', updateFontSize);
      return () => window.removeEventListener('resize', updateFontSize);
    }, []);
   
    return (
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="title-go" style={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: fontSize.go,
          color: '#FF4D4D',
          WebkitTextStroke: '2px #000',
          animation: 'bounce 0.5s infinite alternate, colorChange 2s infinite'
        }}>
          GO!GO!
        </div>
        <div className="title-kurumu" style={{
          fontFamily: "'M PLUS Rounded 1c', sans-serif",
          fontWeight: 800,
          fontSize: fontSize.kurumu,
          color: '#FFD700',
          WebkitTextStroke: '2px #000',
          marginTop: '16px',
          animation: 'bounce 0.5s infinite alternate, colorChange 2s infinite',
          animationDelay: '0.25s'
        }}>
          くるむセンパイ
        </div>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@800&display=swap');
   
            @keyframes bounce {
              from { transform: translateY(0); }
              to { transform: translateY(-10px); }
            }
   
            @keyframes colorChange {
              0% { color: #FF4D4D; }
              33% { color: #FFD700; }
              66% { color: #FF69B4; }
              100% { color: #FF4D4D; }
            }
   
            .title-go, .title-kurumu {
              text-shadow: 
                4px 4px 0 #000,
                -4px -4px 0 #000,
                4px -4px 0 #000,
                -4px 4px 0 #000,
                0 0 10px rgba(255,255,255,0.8);
            }
          `}
        </style>
      </div>
    );
   };