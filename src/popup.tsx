import { renderToStaticMarkup } from 'react-dom/server';
import ScreenshotViewer from './compenents/ScreenshotViewer';
import type { DOMRect } from '@/types/chrome';

// メッセージをリッスンして、スクリーンショットを撮る
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'TAKE_SCREENSHOT') {
    const { x, y, width, height } = message.selection;
    takeScreenshot(false, { x, y, width, height });
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
  return tabs[0];
};

const openScreenshotInNewTab = (screenshotUrl: string) => {
  const htmlContent = renderToStaticMarkup(
    <ScreenshotViewer screenshotUrl={screenshotUrl} />
  );
  // 新しいタブで開く
  chrome.tabs.create({ url: 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent) });
};
