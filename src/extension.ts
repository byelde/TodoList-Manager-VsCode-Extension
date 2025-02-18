import { commands, ExtensionContext, window } from "vscode";

import { TodoPanel } from "./panels/TodoPanel";
import { SidebarProvider } from "./providers/SideBarProvider";

// This method is called when your extension is activated
export function activate(context: ExtensionContext) {
  
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  /**
   * Registers a webview view provider for the "react-todo-sideBar-view" view.
   * This allows the sidebar provider to render the sidebar webview.
   */
  context.subscriptions.push(
    window.registerWebviewViewProvider(
      "react-todo-sideBar-view", // This should match the id from the views contribution in the package.json.
      sidebarProvider
    )
  );


	/**
  * Registers a command to render the TodoPanel webview.
  * When the command is executed, it calls the `render` static method of the `TodoPanel` class,
  * passing the extension URI as an argument.
  */
 context.subscriptions.push(
    commands.registerCommand(
      'react-todo.ToDo', // This should match the id from the commands contribution in the package.json.
      () => {TodoPanel.render(context.extensionUri);} // Renders the current webview panel
    )
  );

  
	/**
  * Registers a command to add a todo item from the current text selection.
  * When the command is executed, it retrieves the selected text, the file path, and the line number,
  * and sends a message to the React component `TodoInput` in `webview-ui/src/app/shared/components/TodoInput.tsx`.
  * This allows the React component to handle the addition of the todo item.
  */
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