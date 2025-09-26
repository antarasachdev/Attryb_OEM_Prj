import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast";
import { useAuth } from "./store/useAuth";
import { Navbar } from "./components/Navbar";
import {SignUpPage} from "./pages/SignUpPage"
import {LoginPage} from "./pages/LoginPage"
import {CarForm} from "./components/CarForm"
import {CarList} from "./components/CarList"
import {EditCar} from "./components/EditCar"
import {AddCar} from "./components/AddCar"

const App = ()=>{
  const {checkAuth, authUser} = useAuth();
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  
  return (
    <div>
      {/* <Navbar/> */}
       <CarForm />
        <CarList />
      <Routes>
        {/* <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} /> */}
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/cars" element={<CarList />} />
      <Route path="/edit-car/:id" element={<EditCar />} />
        </Routes>
      <Toaster/>
    </div>
  )
}
export default App;