// import './App.css';
 import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from './components/Login';
import { auth } from "./Firebase";
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./components/Home";
import Register from "./components/Register";
import SetRemainder from "./components/SetRemainder";
import UpdateRemainder from "./components/UpdateRemainder";
import Logout from "./components/Logout";
import ViewRemainder from "./components/ViewRemainder";


function App() {
  const [isAuth,setAuth]=useState(false);
  const [user] = useAuthState(auth);
  const RequiredAuth=({children})=>{
    const [user] = useAuthState(auth);
    console.log(user);
    return user?children:<Navigate to="/"/>;
  }
  return (
       <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<RequiredAuth>{<Home/>}</RequiredAuth>}/>
        <Route path="/setremainder" element={<RequiredAuth>{<SetRemainder/>}</RequiredAuth>}/>
        <Route path="/updateremainder/:id" element={<UpdateRemainder/>} />
        <Route path="/viewremainder/:id" element={<ViewRemainder/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
     
  );
}

export default App;