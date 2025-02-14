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
      <ul className="todo-list">
        {todoList.map(
          ( todoListItem )=>(
            <TodoListElement
              key={todoListItem.id} 
              {...todoListItem}
            />
          )
        )}
      </ul>

    </div>
  )
}

export default Home;