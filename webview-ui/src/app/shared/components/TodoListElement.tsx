import { useState } from "react";
import { VSCodeCheckbox, VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { FaTrash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { TodoItem } from "../types/TodoItem"
import { useTodoContext } from "../contexts";
import { vscode } from "../../../vscode";


export const TodoListElement = (props: TodoItem) => {

  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);
  const {todoList, updateTodoList} = useTodoContext();


  const goToTodoLocation = () => {
    const todoLocation = props.location;
    if(todoLocation){
      vscode.postMessage({
        command: "goToLocation",
        value: todoLocation
      });
    }
  }

  const deleteTodoItem = () => {
    const newTodoList = todoList.filter((todoItem) => todoItem.id !== props.id);
    updateTodoList(newTodoList);
  }


  const toggleTodoItem = () => {

    setIsChecked(!isChecked);

    const newTodoList = todoList.map((currTodoItem) => {
      if(currTodoItem.id === props.id){
        currTodoItem.isChecked = !currTodoItem.isChecked;
      };
      return currTodoItem;
    });

    updateTodoList(newTodoList);

  }

  return(
    <li className="todo-item">
      <VSCodeCheckbox checked={isChecked} onChange={toggleTodoItem}/>
      
      <span className={isChecked ? 'checked' : ''}>{props.text}</span>
      
      <VSCodeButton onClick={deleteTodoItem}>
        <FaTrash/>
      </VSCodeButton>
      <VSCodeButton onClick={goToTodoLocation} disabled={!props.location.path}>
        <FaLocationDot/>
      </VSCodeButton>
    </li>
  )
}

/// <reference types="../../globals" />
