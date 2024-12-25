import React from 'react';

interface HamsterCharacterProps {
  isJumping: boolean;
  runPhase: number;
}

export const HamsterCharacter: React.FC<HamsterCharacterProps> = ({ isJumping, runPhase }) => {
  const bodyRotation = isJumping ? 0 : Math.sin(runPhase) * 5;
  const leftLegRotation = isJumping ? 0 : Math.sin(runPhase) * 20;
  const rightLegRotation = isJumping ? 0 : -Math.sin(runPhase) * 20;
  const leftArmRotation = isJumping ? 0 : Math.sin(runPhase) * 30;
  const rightArmRotation = isJumping ? 0 : -Math.sin(runPhase) * 30;

  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      {/* メインボディ */}
      <g transform={`rotate(${bodyRotation} 16 16)`}>
        {/* Body Base - Light Gray */}
        <rect x="10" y="7" width="12" height="19" fill="#C0C0C0"/>
        <rect x="9" y="8" width="14" height="17" fill="#C0C0C0"/>
        <rect x="8" y="9" width="16" height="15" fill="#C0C0C0"/>
        <rect x="10" y="15" width="12" height="10" fill="#FFFFFF"/>
        <rect x="9" y="16" width="14" height="8" fill="#FFFFFF"/>
        <rect x="11" y="4" width="10" height="2" fill="#778899"/>
        <rect x="10" y="6" width="12" height="2" fill="#778899"/>
        <rect x="9" y="8" width="14" height="2" fill="#778899"/>
        <rect x="8" y="10" width="5" height="4" fill="#FFFFFF"/>
        <rect x="19" y="10" width="5" height="4" fill="#FFFFFF"/>
        <rect x="9" y="11" width="3" height="2" fill="#000000"/>
        <rect x="20" y="11" width="3" height="2" fill="#000000"/>
        <rect x="14" y="13" width="4" height="3" fill="#000000"/>
        <rect x="7" y="13" width="4" height="4" fill="#FFE4E1"/>
        <rect x="21" y="13" width="4" height="4" fill="#FFE4E1"/>

        {/* 腕と足 */}
        <g transform={`translate(8.5 18) rotate(${leftArmRotation}) translate(-8.5 -18)`}>
          <rect x="7" y="16" width="3" height="5" fill="#C0C0C0"/>
        </g>
        <g transform={`translate(23.5 18) rotate(${rightArmRotation}) translate(-23.5 -18)`}>
          <rect x="22" y="16" width="3" height="5" fill="#C0C0C0"/>
        </g>
        <g transform={`translate(13 25) rotate(${leftLegRotation}) translate(-13 -25)`}>
          <rect x="11" y="24" width="4" height="2" fill="#333333"/>
        </g>
        <g transform={`translate(19 25) rotate(${rightLegRotation}) translate(-19 -25)`}>
          <rect x="17" y="24" width="4" height="2" fill="#333333"/>
        </g>
      </g>
    </svg>
  );
};