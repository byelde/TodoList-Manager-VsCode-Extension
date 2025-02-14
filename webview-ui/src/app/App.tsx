import { Routes } from "./routes"
import { TodoProvider } from "./shared/contexts"



function App() {
  
  return (
    <TodoProvider>
      <Routes/>
    </TodoProvider>
  )
}

export default App
