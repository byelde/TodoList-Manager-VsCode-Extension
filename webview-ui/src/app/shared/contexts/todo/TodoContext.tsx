import { createContext, useContext } from "react";
import { ITodoList } from "./TodoProvider";


/**
 * A React context that provides access to a TodoList object, which contains the state and methods for managing a todo list.
 */
export const TodoContext = createContext<ITodoList>({} as ITodoList);

/**
 * A custom React hook that provides access to the TodoContext.
 * @returns The TodoContext object, which contains the state and methods for managing a todo list.
 */
export const useTodoContext = () => {return useContext(TodoContext)};