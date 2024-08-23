import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Button(_a) {
    var onClick = _a.onClick, imgSrc = _a.imgSrc, imgAlt = _a.imgAlt, text = _a.text;
    return (_jsxs("button", { onClick: onClick, className: "api-button", children: [_jsx("img", { src: imgSrc, className: "logo", alt: imgAlt }), _jsx("div", { children: text })] }));
}
export default Button;
