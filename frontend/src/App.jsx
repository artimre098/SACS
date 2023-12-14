import { Route, Routes } from "react-router-dom"
import UserLogin from "./pages/userLogin"
import  Home  from "./pages/Home"
import AdminHome from "./pages/Admin/adminHome"
import { Toaster } from "react-hot-toast"
import CollectionReport from "./pages/Admin/Reports/CollectionReport"
function App() {
  

  return (
    <>
    <Toaster position="center-top" toastOptions={{duration: 2000}} />
    <Routes>  
          <Route  path="/" element={<UserLogin />}/>
          <Route  path="/accounts/student/:studentId" element={<Home />}/>
          <Route  path="/students/:studentId" element={<AdminHome />} />
          <Route path="/report" element={<CollectionReport />}/>
    </Routes>
    </>
  )
}

export default App
