import { TodoLocation } from "./TodoLocation";

export type TodoItem = {
  id: string;
  text: string;
  isChecked: boolean;
  location: TodoLocation;
};