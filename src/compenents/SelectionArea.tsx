// Responsibility(責務)：画面選択の座標を取得する
import React, { useState } from 'react';
import type { DOMRect } from '@/types/chrome';

const SelectionArea = ({ onSelect }: { onSelect: (selection: DOMRect) => void }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState<Pick<DOMRect, 'x' | 'y'> | null>(null);
  const [selection, setSelection] = useState<DOMRect | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSelecting(true);
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !startPoint) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    const newSelection = {
      x: Math.min(startPoint.x, currentX),
      y: Math.min(startPoint.y, currentY),
      width: Math.abs(currentX - startPoint.x),
      height: Math.abs(currentY - startPoint.y),
    };

    setSelection(newSelection);
  };

  const handleMouseUp = () => {
    if (isSelecting && selection) {
      onSelect(selection);
    }
    setIsSelecting(false);
    setStartPoint(null);
    setSelection(null);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        cursor: isSelecting ? 'crosshair' : 'default',
      }}
    >
      {selection && (
        <div
          style={{
            position: 'absolute',
            top: selection.y,
            left: selection.x,
            width: selection.width,
            height: selection.height,
            border: '2px dashed #000',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        />
      )}
    </div>
  );
};

export default SelectionArea;
