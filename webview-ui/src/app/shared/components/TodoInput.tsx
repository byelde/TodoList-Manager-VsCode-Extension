import { VSCodeTextField, VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { useState } from "react"
import { nanoid } from "nanoid";

import { useTodoContext } from "../contexts";
import { TodoItem } from "../types/TodoItem";

export const TodoInput = () => {

  const [textInput, setTextInput] = useState<string>('');
  const {todoList, updateTodoList} = useTodoContext();
  

  /**
   * Listens for a message event on the window and handles the "addTodoSelection" command by calling the `addTodoItem` 
   * function with the provided path, line, and text values.
   */
  window.addEventListener('message', async (e) => {
    const message = e.data;
    switch (message.command){
      case "addTodoSelection":
        console.log("ADDED BY CONTEXT");
        addTodoItem(message.value.path, message.value.line, message.value.text);
    }
  });


  /**
   * Adds a new todo item to the todo list.
   */
  const addTodoItem = (
    path: string|undefined = undefined, 
    line: number|undefined = undefined, 
    text: string|undefined = undefined
  ) => {
    if(textInput.length === 0 && text === undefined) return;

    const item: TodoItem = {
      id: nanoid(),
      text: text ?? textInput,
      isChecked: false,
      position: {path: path, line: line}
    };

    updateTodoList([...todoList, item]);
    setTextInput("");

    console.log(`${item.id} ${item.text} ${item.isChecked} ${item.position} added.`)
  }


  /**
   * Handles the key press event on the input field. If the user presses the "Enter" key, it calls the `addTodoItem` function to add a new todo item.
   * @returns `null` if the "Enter" key is not pressed, otherwise it calls the `addTodoItem` function.
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return e.key === "Enter" ? addTodoItem() : null;
  }


  return (
    <div className="todo-input-container">
      <VSCodeTextField
        value={textInput}
        onChange={(e)=>{
          setTextInput((e.target as HTMLInputElement).value)
        }}
        onKeyUp={handleKeyPress}
        placeholder="Enter text here"
      />

      <VSCodeButton onClick={()=>{addTodoItem()}}>
        Add
      </VSCodeButton>
      
    </div>
  )
}