import { commands, ExtensionContext, window } from "vscode";

import { TodoPanel } from "./panels/TodoPanel";
import { SidebarProvider } from "./providers/SideBarProvider";

// This method is called when your extension is activated
export function activate(context: ExtensionContext) {
  
  // Register the sidebar webview
  context.subscriptions.push(
    window.registerWebviewViewProvider(
      "react-todo-sideBar-view", // This should match the id from the views contribution in the package.json.
      new SidebarProvider(context.extensionUri)
    )
  );

  // Register the command to activate the webview panel todolist mode
	context.subscriptions.push(
    commands.registerCommand(
      'react-todo.ToDo', // This should match the id from the commands contribution in the package.json.
      () => {TodoPanel.render(context.extensionUri);} // Renders the current webview panel
    )
  );
}