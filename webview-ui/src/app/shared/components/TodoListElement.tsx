import { VSCodeCheckbox, VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { TodoItem } from "../types/TodoItem"
import { useTodoContext } from "../contexts";
import { useState } from "react";

export const TodoListElement = (props: TodoItem) => {

  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);
  const {todoList, updateTodoList} = useTodoContext();

  // Deleting the curr Todo List element from Todo list, and updating
  // the vscode local storage.
  const deleteTodoItem = () => {
    const newTodoList = todoList.filter((todoItem) => todoItem.id !== props.id);
    updateTodoList(newTodoList);
  }

  // Change the current state of isChecked, update the Todo List and 
  // passing this to local storage
  const toggleTodoItem = () => {

    setIsChecked(!isChecked); // attention! it can be "(prevChecked) => !prevChecked)"

    const newTodoList = todoList.map((currTodoItem) => {
      if(currTodoItem.id === props.id){
        currTodoItem.isChecked = !currTodoItem.isChecked;
      };
      return currTodoItem;
    });

    updateTodoList(newTodoList);

  }

  return(
    <li>
      <VSCodeCheckbox checked={isChecked} onChange={toggleTodoItem}/>
      <span>{props.text}</span>
      <VSCodeButton onClick={deleteTodoItem}> </VSCodeButton>
    </li>
  )
}