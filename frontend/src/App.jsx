import { Route, Routes } from "react-router-dom"
import UserLogin from "./pages/userLogin"

function App() {
  

  return (
    <Routes>  
          <Route  path="/" element={<UserLogin />}/>
    </Routes>
  )
}

export default App
