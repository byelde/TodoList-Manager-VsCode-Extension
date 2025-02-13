import { Routes } from "./routes"
import { DataProvider } from "./shared/contexts"


function App() {
  
  return (
    <DataProvider>
      <Routes/>
    </DataProvider>
  )
}

export default App
