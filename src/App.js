// import './App.css';
 import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from './components/Login';
// import Register from './pages/Register';
// import { auth } from "./firebaseConfig";
//import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./components/Home";
import Register from "./components/Register";


function App() {
  // const [isAuth,setAuth]=useState(false);
  // const [user] = useAuthState(auth);
  // const RequiredAuth=({children})=>{
  //   const [user] = useAuthState(auth);
  //   console.log(user);
  //   return user?children:<Navigate to="/"/>;
  // }
  return (
    
  
  
    
  
    
       <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>

        
        {/* <Route path="/home" >
          <Route index element={<RequiredAuth>{<Home/>}</RequiredAuth>}/>
           <Route path="write" element={<Write/>}/>
        </Route> */}
         
      </Routes>
     
  );
}

export default App;