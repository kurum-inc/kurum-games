import React from 'react';
import './Block.css'; // Tailwind CSSのスタイルを適用するためにCSSファイルをインポート

interface BlockProps {
    color: string; // ブロックの色
}

const Block: React.FC<BlockProps> = ({ color }) => {
    return (
        <div className={`block w-10 h-10 rounded-md ${color}`}>
            {/* ブロックの表示内容をここに追加 */}
        </div>
    );
};

export default Block;
