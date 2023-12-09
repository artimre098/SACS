import { Route, Routes } from "react-router-dom"
import UserLogin from "./pages/userLogin"
import  Home  from "./pages/Home"
import { Toaster } from "react-hot-toast"
function App() {
  

  return (
    <>
    <Toaster position="center-top" toastOptions={{duration: 2000}} />
    <Routes>  
          <Route  path="/" element={<UserLogin />}/>
          <Route  path="/accounts/student/:studentId" element={<Home />}/>
    </Routes>
    </>
  )
}

export default App
