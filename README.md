# React Todo VS Code Extension

A VS Code extension that provides a convenient Todo list manager right within your editor.

## Features

- Integrated Todo panel in VS Code
- React-based UI with TypeScript support
- Real-time updates using VS Code's webview API
- Modern development setup with Vite

## Technical Stack

- VS Code Extension API
- React 18+ with TypeScript
- Vite for frontend tooling
- WebView Panel integration

## Requirements
- VsCode 1.97.0+
- Node.js 22.14.0+
- Npm 10.9.2+

- Obs: Recommend install node and npm by nvm

## Development Setup

1. Clone the repository
2. Open the root project directory using VS Code
3. Install dependencies: npm install:all
4. Build the extension: npm run build:webview
- Obs: you can see these commands in root/package.json

## Run
1. npm run watch
2. npm run build:webview (if not builded yet)
3. open root/src/extension.ts
4. Press F5

## References/Credits
- [VS Code Extension API](https://code.visualstudio.com/api)
- [VS Code Extension Samples - Webview](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample/src/extension.ts#L150)
- [How to Code a VS Code Extension](https://www.youtube.com/watch?v=a5DX5pQ9p5M)
- [Build a TODO VSCode extension using React.js](https://www.youtube.com/watch?v=MbCXrFOLh18)

## Observations
- [getUri.ts](src/utilities/getUri.ts) and [vscode.ts](webview-ui/src/vscode.ts) are external contributions
- [TodoPanel.ts](src/panels/TodoPanel.ts) and [getUri.ts](src/utilities/getUri.ts) has external contributions