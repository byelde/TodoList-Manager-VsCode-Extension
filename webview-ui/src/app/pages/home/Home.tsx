import { TodoInput } from "../../shared/components/TodoInput";
import { TodoListElement } from "../../shared/components/TodoListElement";
import { useTodoContext } from "../../shared/contexts";

function Home() {
  
  const{ todoList } = useTodoContext();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Hello World!</p>

      <TodoInput/>
      <ul>
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