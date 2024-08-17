import { useState } from 'react'
import full_screenshot from './assets/full_screenshot.svg'
import crop from './assets/crop.svg'
import './App.css'

function App() {
  return (
    <>
      <div className="logo-container">
        <a href="https://vitejs.dev" target="_blank">
          <img src={full_screenshot} className="logo" alt="full_screenshot logo" />
          <div>Full ScreenShot</div>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={crop} className="logo" alt="crop logo" />
          <div>Select & Capture</div>
        </a>
      </div>
      <div className="read-the-docs">
        <p >
          Your support helps us improve and maintain.
        </p>
        <div>
          <a href="https://react.dev" target="_blank">Give Feedback</a>
          <div> and </div>
          <a href="https://react.dev" target="_blank">Support Us</a>
        </div>
      </div>
    </>
  )
}

export default App
