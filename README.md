# 使用技術
React + TypeScript + Vite

## Vite Plugin
### [vite-plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
Reactのコンパイラ。Babel の約20倍速い SWC を使用している

### [vite-tsconfig-paths](https://github.com/vitejs/vite-plugin-react-swc)
TypeScriptのtsconfig.jsonファイルに設定されたパスエイリアスをViteのビルドプロセスでもサポートするためのツール。TypeScriptとViteのパスエイリアスが一致するようになる。(本来、パスエイリアスを設定するには tsconfig.json と vite.config.ts の両方を編集する必要あり)

### [@crxjs/vite-plugin](https://github.com/vitejs/vite-plugin-react-swc)
Chrome拡張機能開発用プラグイン

## API


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
