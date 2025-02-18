import { TodoPosition } from "./TodoPosition";

export type TodoItem = {
  id: string;
  text: string;
  isChecked: boolean;
  position: TodoPosition;
};