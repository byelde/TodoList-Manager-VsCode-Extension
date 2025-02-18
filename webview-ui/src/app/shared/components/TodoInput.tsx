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
  window.addEventListener('message', async (e) => {
    const message = e.data;
    switch (message.command){
      case "addTodoSelection":
        console.log("ADDED BY CONTEXT");
        addTodoItem(message.value.path, message.value.line, message.value.text);
    }
  });


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

  // Handle the key press event will activate the addTodoItem 
  // function on VSCodeTextField
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