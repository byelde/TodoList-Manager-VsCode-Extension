import { 
  Uri,
  Webview,
  WebviewView,
  TextDocument,
  WebviewViewProvider,
  window,
  workspace,
  Selection
} from "vscode";

import { getNonce, getUri } from "../utilities";


/**
 * Provides a webview view for the sidebar of a Visual Studio Code extension.
 * This class implements the `WebviewViewProvider` interface to handle the creation and management of the webview view.
 */
export class SidebarProvider implements WebviewViewProvider {
  _view?: WebviewView;
  _doc?: TextDocument;

  constructor(private readonly _extensionUri: Uri) {}

  /**
   * Resolves the webview view for the sidebar of the Visual Studio Code extension.
   * This method sets up the webview options, HTML content, and message listener.
   * @param webviewView - The webview view to be resolved.
   */
  public resolveWebviewView(webviewView: WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow Js scripts in the webview
      enableScripts: true,
      // Limit the application to use resources from the project folder folder
      localResourceRoots: [this._extensionUri],
    };

    // Set the HTML for the webview
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview, this._extensionUri); 

    // Set a listener for messages from the webview
    webviewView.webview.onDidReceiveMessage(async (message) => { 
      const command = message.command;
      switch (command) {
        case "goToLocation":
          const location = message.value;
          const path = location.path;
          const line = location.line;
          console.log(`Opening ${message.value.path} at line ${message.value.line}`);

          workspace.openTextDocument(path)
            .then((document) => window.showTextDocument(document))
            .then((editor) => {
              editor.selection  = new Selection(line, 0, line, 0);
              editor.revealRange(editor.selection);
            });
          return;
      }
    });
  }

  // public revive(panel: WebviewView) {
  //   this._view = panel;
  // }

  /**
   * Generates the HTML content for the webview view in the sidebar of the Visual Studio Code extension.
   * This method sets up the necessary CSS and JavaScript resources, as well as the Content Security Policy (CSP) for the webview.
   * @param webview - The webview instance to generate the HTML for.
   * @param extensionUri - The URI of the extension, used to locate the CSS and JavaScript resources.
   * @returns The generated HTML content for the webview.
   */
  private _getHtmlForWebview(webview: Webview, extensionUri: Uri) {

    // Get the CSS file from the React build output
    const stylesUri = getUri(webview, extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "index.css",
    ]);
    // Get the JS file from the React build output
    const scriptUri = getUri(webview, extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "index.js",
    ]);

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return /*html*/`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<link rel="stylesheet" type="text/css" href="${stylesUri}">
        <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        <script>
          tsvscode = acquireVsCodeApi();
        </script>
			</head>
      <body>
        <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        <div id="root"></div> <!-- This is where the React app will render -->
			</body>
			</html>`;
  }
}