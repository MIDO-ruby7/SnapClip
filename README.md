# SanpClip.
SnapClipは、スクリーンショットを簡単に取得し、編集するためのChrome拡張機能です。


このツールを使えば、画面全体や選択した部分をキャプチャして、素早く編集することができます。

## DEMO

## Usage
1. インストール: Chrome拡張機能としてSnapClipをインストールします。
  https://chromewebstore.google.com/detail/snapclip/ellkjgioaalcapghdhfepfddpjjphohp?authuser=0&hl=ja

2. キャプチャ:
  - 全画面キャプチャ: 「Full ScreenShot」ボタンをクリックして、表示されている画面全体をキャプチャします。
  - 選択してキャプチャ: ドラッグ&ドロップで範囲を選択し、部分的にキャプチャします。

3. 編集: キャプチャしたスクリーンショットを編集し、必要に応じて保存します。

## 使用技術
<div>
  <p><img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=for-the-badge"></p>
  <p><img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=for-the-badge"></p>
  <p><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"></p>
</div>

### Vite Plugin
- [vite-plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Reactのコンパイラ。Babel の約20倍速い SWC を使用している
- [vite-tsconfig-paths](https://github.com/vitejs/vite-plugin-react-swc): TypeScriptのtsconfig.jsonファイルに設定されたパスエイリアスをViteのビルドプロセスでもサポートするためのツール。TypeScriptとViteのパスエイリアスが一致するようになる

- [@crxjs/vite-plugin](https://github.com/vitejs/vite-plugin-react-swc): Chrome拡張機能開発用プラグイン

### Libraly
- [React](https://ja.react.dev): ユーザーインターフェースを構築するためのライブラリ
- [Fabric.js](http://fabricjs.com/): キャプチャしたスクリーンショットの編集に使用
