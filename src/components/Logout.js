import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    const movetologin=()=>{
        navigate('/');
    }
  return (
    <>
        <div style={{width:'100vw',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div>
                <p>you have been Logout</p>
                <button onClick={movetologin}>Login</button>
            </div> 
        </div>
    </>
  )
}

export default Logout