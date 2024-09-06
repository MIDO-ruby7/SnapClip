import { useCallback} from 'react';
import Button from './compenents/Button'
import SupportSection from './compenents/SupportSection'
import full_screenshot from './assets/full_screenshot.svg'
import { takeScreenshot, getCurrentTab } from './popup'
import crop from './assets/crop.svg'
import './App.css'

function App() {
  const handleFullScreenshot = useCallback(async () => {
    const tab = await getCurrentTab()
    const selection = { x: 0, y: 0, width: tab.width, height: tab.height };
    takeScreenshot(true, selection);
  }, []);

  const handleCropScreenshot = useCallback(async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id!, { action: 'TAKE_SCREENSHOT' });
    window.close();
  }, []);

  return (
    <>
      <div className="logo-container">
        <Button
          onClick={handleFullScreenshot}
          imgSrc={full_screenshot}
          imgAlt="full_screenshot logo"
          text="Full ScreenShot"
        />
        <Button
          onClick={handleCropScreenshot}
          imgSrc={crop}
          imgAlt="crop logo"
          text="Select & Capture"
        />
      </div>
      <SupportSection />
    </>
  )
}

export default App
