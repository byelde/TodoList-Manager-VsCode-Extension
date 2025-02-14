import { VSCodeTextField, VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { useState } from "react"
import { nanoid } from "nanoid";

import { useTodoContext } from "../contexts";
import { TodoItem } from "../types/TodoItem";


export const TodoInput = () => {

  const [textInput, setTextInput] = useState<string>('');
  const {todoList, updateTodoList} = useTodoContext();
  
  // function that receive the data from state, create the object
  // and update the state;
  const addTodoItem = () => {
    if(textInput.length === 0) return;

    const item: TodoItem = {
      id: nanoid(),
      text: textInput,
      isChecked: false
    };

    // unmount the Todo List and mounting including the new
    // todo item
    updateTodoList([...todoList, item]);
    setTextInput("");

    console.log(`${item.id} ${item.text} ${item.isChecked} added.`)

  }

  return (
    <div className="todo-input-container">
      <VSCodeTextField
        value={textInput}
        onChange={(e)=>{
          // Converting a react event object into a HTMLInputElement
          // and getting it data;
          setTextInput((e.target as HTMLInputElement).value)
        }}
        placeholder="Enter text here"
      />

      <VSCodeButton onClick={addTodoItem}>
        Add
      </VSCodeButton>
      
    </div>
  )
}