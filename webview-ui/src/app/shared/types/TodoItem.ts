import { TodoLocation } from "./TodoLocation";

/**
 * Represents a single todo item with its associated properties.
 * @property {string} id - The unique identifier for the todo item.
 * @property {string} text - The text content of the todo item.
 * @property {boolean} isChecked - Indicates whether the todo item has been completed.
 * @property {TodoLocation} location - The location associated with the todo item.
 */
export type TodoItem = {
  id: string;
  text: string;
  isChecked: boolean;
  location: TodoLocation;
};