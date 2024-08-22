import Button from './compenents/Button'
import SupportSection from './compenents/SupportSection'
import full_screenshot from './assets/full_screenshot.svg'
import { takeFullScreenshot } from './popup'
import crop from './assets/crop.svg'
import './App.css'

function App() {
  return (
    <>
      <div className="logo-container">
        <Button
          onClick={takeFullScreenshot}
          imgSrc={full_screenshot}
          imgAlt="full_screenshot logo"
          text="Full ScreenShot"
        />
        <Button
          onClick={takeFullScreenshot}
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
