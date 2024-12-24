import React from 'react';
import Block from './Block';

interface GameBoardProps {
    rows: number;
    cols: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ rows, cols }) => {
    const [board, setBoard] = React.useState<JSX.Element[][]>([]);
    const [fallingBlockCoord, setFallingBlockCoord] = React.useState<{ row: number; col: number } | null>(null);

    // ゲームボードの初期化
    const initBoard = () => {
        const newBoard: JSX.Element[][] = [];
        for (let i = 0; i < rows; i++) {
            newBoard[i] = [];
            for (let j = 0; j < cols; j++) {
                newBoard[i][j] = <Block key={`${i}-${j}`} color="bg-gray-300" />;
            }
        }
        setBoard(newBoard);
    };

    // ブロックを落下させる関数
    const dropBlock = () => {
        if (!fallingBlockCoord) {
            // 新しい落下中のブロックの座標を設定する
            setFallingBlockCoord({ row: 0, col: Math.floor(cols / 2) }); // 最上段の中央に配置
        } else {
            // 落下中のブロックを1マス下に移動させる
            if (fallingBlockCoord.row < rows - 1) {
                setFallingBlockCoord({ row: fallingBlockCoord.row + 1, col: fallingBlockCoord.col });
            }
        }
    };

    // 初期化処理
    React.useEffect(() => {
        initBoard();
    }, []);

    // タイマーを使用してブロックを落下させる
    React.useEffect(() => {
        const timer = setInterval(() => {
            dropBlock();
        }, 1000); // 1秒ごとに落下させる

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="game-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((block, colIndex) => (
                        <React.Fragment key={colIndex}>{block}</React.Fragment>
                    ))}
                </div>
            ))}
            {fallingBlockCoord && (
                <div className="falling-block" style={{ top: `${fallingBlockCoord.row * 30}px`, left: `${fallingBlockCoord.col * 30}px` }}>
                    <Block key="falling" color="bg-blue-500" />
                </div>
            )}
        </div>
    );
};

export default GameBoard;
