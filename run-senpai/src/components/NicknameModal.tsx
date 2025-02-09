// src/components/NicknameModal.tsx
import React from 'react';

interface NicknameModalProps {
  playerName: string;
  onNameChange: (name: string) => void;
  onStart: () => void;
  nameError: string;
}

export const NicknameModal: React.FC<NicknameModalProps> = ({
  playerName,
  onNameChange,
  onStart,
  nameError,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg p-6 w-80 max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">ニックネームを入力</h2>
        <input
          type="text"
          value={playerName}
          onChange={(e) => onNameChange(e.target.value.slice(0, 10))}
          placeholder="ニックネーム（10文字以内）"
          className="w-full px-4 py-2 border rounded mb-2"
          maxLength={10}
        />
        {nameError && (
          <p className="text-red-500 text-sm mb-2">{nameError}</p>
        )}
        <div className="text-xs text-gray-500 mb-4">
          ※ニックネームはランキングに表示されます
        </div>
        <button
          onClick={onStart}
          className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition-colors"
        >
          START!
        </button>
      </div>
    </div>
  );
};