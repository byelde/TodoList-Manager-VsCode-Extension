import { commands, ExtensionContext } from "vscode";
import { TodoPanel } from "./panels/TodoPanel";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId (first param of registerCommand method) parameter must match the command field in package.json

	context.subscriptions.push(
    // The code you place here will be executed every time your command is executed
    commands.registerCommand('react-todo.ToDo', () => {
      // Display a message box to the user
      TodoPanel.render(context.extensionUri);
    })
  );
}