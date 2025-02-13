import {MemoryRouter, Routes as Switch, Route} from "react-router"
import Home from "../pages/home/Home"


export const Routes = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" element={<Home/>}/>
      </Switch>
    </MemoryRouter>
  )
}