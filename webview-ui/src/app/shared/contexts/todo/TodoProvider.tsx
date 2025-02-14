import React, { useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";
import { TodoItem } from "../../types/TodoItem";
import { vscode } from "../../../../vscode";

// Create the interface will shape the Todo List 
// structure and its update/set method
export interface ITodoList {
  todoList: TodoItem[];
  updateTodoList: (newTodoList: TodoItem[]) => void;
};


//Create the interface that will allow TodoProvider has child elements
interface ITodoListProviderProps {
  children: React.ReactNode;
}


export const TodoProvider: React.FC<ITodoListProviderProps> = ({children}) => {

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  // Get todoList items from local store (using 
  // the vscode instance of vscode.ts VSCodeAPIWrapper class)
  useEffect(()=>{
    const storeTodoList = vscode.getState();
    if(storeTodoList) setTodoList(storeTodoList as TodoItem[]);
  },[]);

  // Save the current todoList with setTodoList 
  // (from useState) in vscode local storage
  const updateTodoList = (newTodoList: TodoItem[]) => {
    setTodoList(newTodoList);
    vscode.setState(newTodoList);
  }

  return(
    <TodoContext.Provider value={{todoList:todoList, updateTodoList:updateTodoList}}>
      {children}
    </TodoContext.Provider>
  )
}