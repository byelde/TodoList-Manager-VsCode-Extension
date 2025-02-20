import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { TodoInput } from "../../shared/components/TodoInput";
import { TodoListElement } from "../../shared/components/TodoListElement";
import { useTodoContext } from "../../shared/contexts";

import "../../../index.css"


function Home() {
  
  const{ todoList } = useTodoContext();

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <p>Hello World!</p>

      <TodoInput/>

      <DndProvider backend={HTML5Backend}>
        <ul className="todo-list">
          {todoList.map(
            ( todoListItem, index )=>(
              <TodoListElement
                index={index}
                props={todoListItem}
                key={todoListItem.id} 
              />
            )
          )}
        </ul>
      </DndProvider>

    </div>
  )
}

export default Home;