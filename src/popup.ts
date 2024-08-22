import type  { LayoutMetrics } from './types/chrome';

export const takeFullScreenshot = async () => {
  try {
    // タブ情報取得
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // デバッガアタッチ
    chrome.debugger.attach({ tabId: tab.id }, '1.3', async () => {
      console.log('attach - ok');

      // デバッガ起動待機
      await new Promise((resolve) => setTimeout(resolve, 500));

      // レイアウト情報取得
      chrome.debugger.sendCommand({ tabId: tab.id }, 'Page.getLayoutMetrics', {}, (metrics: LayoutMetrics) => {
        // スクリーンショットパラメータ作成
        const params = {
          format: 'png',
          quality: 50,
          clip: {
            x: 0,
            y: 0,
            width: metrics.cssContentSize.width,
            height: metrics.cssContentSize.height,
            scale: 1
          },
          captureBeyondViewport: true
        };

        // スクリーンショット撮影
        chrome.debugger.sendCommand({ tabId: tab.id }, 'Page.captureScreenshot', params, (result: { data: string }) => {
          // 画像保存
          const downloadEle = document.createElement('a');
          downloadEle.href = 'data:image/png;base64,' + result.data;
          downloadEle.download = 'screenshot.png';
          downloadEle.click();

          // デバッガでタッチ
          chrome.debugger.detach({ tabId: tab.id }, () => {
            console.log('detach ok');
          });
        });
      });
    });
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
};
