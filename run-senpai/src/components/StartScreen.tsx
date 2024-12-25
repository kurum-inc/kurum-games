export const StartScreen = ({ onStart }: { onStart: () => void }) => (
        <div className="absolute inset-0 flex flex-col items-center">
          <div className="mt-24">
            <div style={{
              fontFamily: 'Courier, monospace',
              fontSize: '48px',
              color: '#FFF',
              textShadow: '4px 4px 0 #000, -4px -4px 0 #000, 4px -4px 0 #000, -4px 4px 0 #000',
              WebkitTextStroke: '2px black',
              animation: 'bounce 0.5s infinite alternate'
            }}>
              GO!GO!
            </div>
            <div style={{
              fontFamily: 'Courier, monospace',
              fontSize: '64px',
              color: '#F6E05E',
              textShadow: '4px 4px 0 #000, -4px -4px 0 #000, 4px -4px 0 #000, -4px 4px 0 #000',
              WebkitTextStroke: '2px black',
              marginTop: '16px',
              animation: 'bounce 0.5s infinite alternate',
              animationDelay: '0.25s'
            }}>
              くるむセンパイ!
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStart();
            }}
            className="mt-32 px-12 py-6 bg-green-500 text-white text-3xl font-bold rounded-lg hover:bg-green-600 transition-colors"
            style={{
              textShadow: '2px 2px 0 #000',
              border: '4px solid #000'
            }}
          >
            START!
          </button>
        </div>
  );