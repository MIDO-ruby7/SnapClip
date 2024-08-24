export const takeScreenshot = async (
  captureBeyondViewport: boolean,
  selection: { x: number; y: number; width: number; height: number }
) => {
  const tab = await getCurrentTab();
  const debuggeeId = { tabId: tab.id! };
  console.log("selection",selection)
    // デバッガアタッチ
    chrome.debugger.attach(debuggeeId, '1.3', () => {
      const method = "Page.captureScreenshot"
      const params = {
        format: "png",
        quality: 50,
        captureBeyondViewport: captureBeyondViewport,
        clip: {
          x: selection.x,
          y: selection.y,
          width: selection.width,
          height: selection.height,
          scale: 1,
        },
      }

      // レイアウト情報取得
      chrome.debugger.sendCommand(debuggeeId, method, params, (result: { data: string }) => {
        if (result && result.data) {
          const screenshotUrl = `data:image/png;base64,${result.data}`;
          displayScreenshot(screenshotUrl);
        } else {
          // TODO: sanckbarなどでユーザーに表示できるように
          // TODO: HTMLでのキャプチャならいけるかを試す
          console.error('このページは取得できないようです');
        }
    });
  });
};

export const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

const displayScreenshot = (screenshotUrl: string) => {
  // 既存のスクリーンショットがあれば削除 TODO: 写真を閉じた時点でもinitする
  const existingScreenshot = document.getElementById('screenshot-display');
  if (existingScreenshot) {
    existingScreenshot.remove();
  }

  // 画像要素を作成
  const img = document.createElement('img');
  img.src = screenshotUrl;
  img.alt = 'Captured Screenshot';
  img.id = 'screenshot-display';
  img.style.maxWidth = '100%';
  img.style.maxHeight = '100%';
  img.style.border = '1px solid #ccc';
  img.style.marginTop = '20px';

  // 表示する場所を決定（例としてボディの末尾に追加）
  document.body.appendChild(img);
};
