import { createContext } from "react";
import { IData } from "./TodoProvider";

export const DataContext = createContext<IData>({} as IData);