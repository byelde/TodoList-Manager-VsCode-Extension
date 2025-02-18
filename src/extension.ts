import { commands, ExtensionContext, window } from "vscode";

import { TodoPanel } from "./panels/TodoPanel";
import { SidebarProvider } from "./providers/SideBarProvider";

// This method is called when your extension is activated
export function activate(context: ExtensionContext) {
  
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  // Register the sidebar webview
  context.subscriptions.push(
    window.registerWebviewViewProvider(
      "react-todo-sideBar-view", // This should match the id from the views contribution in the package.json.
      sidebarProvider
    )
  );

  // Register the command to activate the webview panel todolist mode
 context.subscriptions.push(
    commands.registerCommand(
      'react-todo.ToDo', // This should match the id from the commands contribution in the package.json.
      () => {TodoPanel.render(context.extensionUri);} // Renders the current webview panel
    )
  );

 context.subscriptions.push( commands.registerCommand(
    'react-todo.addTodoSelection', // This should match the id from the commands contribution in the package.json.
    () => {
      const activeTextEditor = window.activeTextEditor;

      if (!activeTextEditor) {
        window.showErrorMessage("No active text editor");
        return;
      }

      const selection = activeTextEditor.selection;
      const text = activeTextEditor.document.getText(selection);
      const path = activeTextEditor.document.uri.path;
      const line = selection.active.line;

      // Send a message to React component TodoInput in webview-ui/src/app/shared/components/TodoInput.tsx
      sidebarProvider._view?.webview.postMessage({
        command: "addTodoSelection",
        value: { text, path, line },
      });
    }
  ));

}