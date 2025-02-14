import { createContext, useContext } from "react";
import { ITodoList } from "./TodoProvider";

// Create and export TodoContext (used specifically in TodoProvider)
export const TodoContext = createContext<ITodoList>({} as ITodoList);

// Create and export a aux to use the useContext arguing with TodoContext;
export const useTodoContext = () => {return useContext(TodoContext)};