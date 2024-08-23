import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Button from './compenents/Button';
import SupportSection from './compenents/SupportSection';
import full_screenshot from './assets/full_screenshot.svg';
import { takeFullScreenshot } from './popup';
// import crop from './assets/crop.svg'
import './App.css';
function App() {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "logo-container", children: _jsx(Button, { onClick: takeFullScreenshot, imgSrc: full_screenshot, imgAlt: "full_screenshot logo", text: "Full ScreenShot" }) }), _jsx(SupportSection, {})] }));
}
export default App;
