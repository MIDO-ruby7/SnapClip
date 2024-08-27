// .tsファイルだと読み込みに失敗するので.tsxにしておく
// https://crxjs.dev/vite-plugin/getting-started/react/add-content-script#add-a-content-script

import type { DOMRect } from "./types/chrome";

let selectionBox: HTMLDivElement | null = null;
let startPoint: Pick<DOMRect, 'x' | 'y'> | null = null;

chrome.runtime.onMessage.addListener((message) => {
  try {
    if (message.action === 'TAKE_SCREENSHOT') {
      console.log("contentScript onMessage:", message.action);
      document.addEventListener('mousedown', handleMouseDown);
    }
  } catch (error) {
    console.error(error);
  }
});

function handleMouseDown(e: MouseEvent) {
  console.log('Mouse down event detected:', e);

  startPoint = { x: e.clientX, y: e.clientY };
  selectionBox = document.createElement('div');

  selectionBox.style.position = 'absolute';
  selectionBox.style.border = '2px dashed #000';
  selectionBox.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
  selectionBox.style.left = `${startPoint.x}px`;
  selectionBox.style.top = `${startPoint.y}px`;
  document.body.appendChild(selectionBox);
  document.body.style.userSelect = '';

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e: MouseEvent) {
  if (!startPoint || !selectionBox) return;

  const currentX = e.clientX;
  const currentY = e.clientY;

  const width = Math.abs(currentX - startPoint.x);
  const height = Math.abs(currentY - startPoint.y);
  const left = Math.min(startPoint.x, currentX);
  const top = Math.min(startPoint.y, currentY);

  selectionBox!.style.width = `${width}px`;
  selectionBox!.style.height = `${height}px`;
  selectionBox!.style.left = `${left}px`;
  selectionBox!.style.top = `${top}px`;
}

function handleMouseUp() {
  if (!selectionBox) return;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);

  const width = parseInt(selectionBox!.style.width, 10);
  const height = parseInt(selectionBox!.style.height, 10);

  if (width === 0 || height === 0) {
    // 選択ボックスが無効な場合は何もしない
    document.body.removeChild(selectionBox!);
    selectionBox = null;
    startPoint = null;
    return;
  }

  const selection: DOMRect = {
    x: parseInt(selectionBox!.style.left, 10),
    y: parseInt(selectionBox!.style.top, 10),
    width,
    height,
  }

  // メッセージをポップアップに送信して、選択範囲のスクリーンショットを実行
  chrome.runtime.sendMessage({ action: 'TAKE_SCREENSHOT', selection }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Error sending message:', chrome.runtime.lastError.message);
    } else {
      console.log('contentScripte sendMessage successfully:', response);
    }
  });

  // Cleanup
  document.body.removeChild(selectionBox!);
  selectionBox = null;
  startPoint = null;
};
