import { useState } from "react";
import { VSCodeCheckbox, VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { FaTrash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDrag, useDrop } from "react-dnd";

import { TodoItem } from "../types/TodoItem"
import { useTodoContext } from "../contexts";
import { vscode } from "../../../vscode";


export const TodoListElement = ({index, props}:{index:number, props: TodoItem}) => {

  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);
  const {todoList, updateTodoList} = useTodoContext();


  /**
   * Moves a todo item within the todo list to a new priority position.
   * @param from - The index of the todo item to be moved.
   * @param to - The new index position for the todo item.
   */
  const moveTodoPriority = (from: number, to:number) => {
    const updatedTodoList = [...todoList];
    const [movedItem] = updatedTodoList.splice(from, 1);
    updatedTodoList.splice(to, 0, movedItem);
    updateTodoList(updatedTodoList);
  };


  // ref and drop are used to enable drag and drop functionality for todo items.

  // The useDrag hook provides a way to wire your component into the DnD system as a drag source
  // Source: https://react-dnd.github.io/react-dnd/docs/api/use-drag
  const [,ref] = useDrag({
    type: "Drag",
    item: {index}
  });


  // The useDrop hook provides a way for you to wire in your component into the DnD system as a drop target
  // Source: https://react-dnd.github.io/react-dnd/docs/api/use-drop
  const [,drop] = useDrop({
    accept: "Drag",
    hover: (dragItem: { index: number }) => {
      if (dragItem.index !== index) {
        moveTodoPriority(dragItem.index, index);
        dragItem.index = index;
        return;
      }
    }  });


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
    <li className="todo-item" ref={(node)=>{ref(drop(node))}}>
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
