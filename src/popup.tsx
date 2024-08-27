import type { DOMRect } from '@/types/chrome';

// メッセージをリッスンして、スクリーンショットを撮る
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'TAKE_SCREENSHOT') {
    console.log("popup onMessage:", message.action, message.selection);
    const { x, y, width, height } = message.selection;
    takeScreenshot(false, { x, y, width, height }).then(() => {
      sendResponse({ status: 'success' });
    }).catch((error) => {
      console.error('Error taking screenshot:', error);
      sendResponse({ status: 'error', error: error.message });
    });
    return true;
  }
});


export const takeScreenshot = async (
  captureBeyondViewport: boolean,
  selection: DOMRect
) => {
  const tab = await getCurrentTab();
  const debuggeeId = { tabId: tab.id! };

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
      chrome.debugger.detach(debuggeeId);
      if (result && result.data) {
        const screenshotUrl = `data:image/png;base64,${result.data}`;
        openScreenshotInNewTab(screenshotUrl);
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
  console.log('Current tab:', tabs[0]);
  return tabs[0];
};

// コンポーネント化してrenderToStaticMarkupで読み込んでいたが、
// Uncaught ReferenceError: window is not defined になるため直接HTMLを書く
const openScreenshotInNewTab = (screenshotUrl: string) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Screenshot</title>
        <style>
          body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          img { max-width: 100%; max-height: 100vh; }
        </style>
      </head>
      <body>
        <img src="${screenshotUrl}" alt="Screenshot"/>
      </body>
    </html>
  `;

  // 新しいタブで開く
  chrome.tabs.create({ url: 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent) });
};
