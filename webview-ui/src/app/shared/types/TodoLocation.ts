/**
 * Represents the location of a todo item within a file.
 * @property {string | undefined} path - The file path where the todo item is located.
 * @property {number | undefined} line - The line number where the todo item is located.
 */
export type TodoLocation = {
  path: string | undefined,
  line: number | undefined,
}