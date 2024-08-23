var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
export var takeFullScreenshot = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tab_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, chrome.tabs.query({ active: true, currentWindow: true })];
            case 1:
                tab_1 = (_a.sent())[0];
                // デバッガアタッチ
                chrome.debugger.attach({ tabId: tab_1.id }, '1.3', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('attach - ok');
                                // デバッガ起動待機
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                            case 1:
                                // デバッガ起動待機
                                _a.sent();
                                // レイアウト情報取得
                                chrome.debugger.sendCommand({ tabId: tab_1.id }, 'Page.getLayoutMetrics', {}, function (metrics) {
                                    // スクリーンショットパラメータ作成
                                    var params = {
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
                                    chrome.debugger.sendCommand({ tabId: tab_1.id }, 'Page.captureScreenshot', params, function (result) {
                                        // 画像保存
                                        var downloadEle = document.createElement('a');
                                        downloadEle.href = 'data:image/png;base64,' + result.data;
                                        downloadEle.download = 'screenshot.png';
                                        downloadEle.click();
                                        // デバッガでタッチ
                                        chrome.debugger.detach({ tabId: tab_1.id }, function () {
                                            console.log('detach ok');
                                        });
                                    });
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error taking screenshot:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
