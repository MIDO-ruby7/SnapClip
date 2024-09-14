import type { DOMRect } from '@/types/chrome';
import icon from '../128.png'

// メッセージをリッスンして、スクリーンショットを撮る
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'TAKE_SCREENSHOT') {
    const { x, y, width, height } = message.selection;
    takeScreenshot(false, { x, y, width, height }).then(() => {
      sendResponse({ status: 'success' });
    }).catch((error) => {
      showNotification('Error', `スクリーンショットの取得に失敗しました: ${error.message}`);
      sendResponse({ status: 'error', error: error.message });
    });
    return true;
  }
});

export const takeScreenshot = async (
  captureBeyondViewport: boolean,
  selection: DOMRect
) => {
  try {
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
          const imageData = `data:image/png;base64,${result.data}`;
          openCanvasInNewTab(imageData);
        } else {
          showNotification('Error', 'このページは取得できないようです');
        }
      });
    });
  } catch (error) {
    showNotification('Error', `スクリーンショットの取得中にエラーが発生しました: ${error.message}`);
  }
};

const showNotification = (title: string, message: string) => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: icon,
    title: title,
    message: message,
    priority: 2
  });
};

export const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

const openCanvasInNewTab = (imageData: string) => {
  // 新しいタブを開く
  chrome.tabs.create({ url: 'https://snap-clip-canvas.vercel.app', active: true }, (tab) => {
    // タブが読み込まれた後にメッセージを送信するためのリスナー
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === 'complete') {

        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: (imageData) => {
            window.postMessage({ imageData }, '*');
          },
          args: [imageData],
        });

        // リスナーを削除してメモリリークを防ぐ
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
};