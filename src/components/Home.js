import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { auth } from '../Firebase';
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import {toast } from 'react-toastify';
import "../style/home.css";


import { Timestamp, collection, addDoc,getDocs,deleteDoc, doc,updateDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const ReminderComponent = () => {
  //universal
  let navigate = useNavigate();
  const [user] = useAuthState(auth);
  //get remainder
  const [remainders, setRemainders] = useState([]);
  const postsCollectionRef = collection(db, "remainders");

  const getremainder = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
    setRemainders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };
  
  //set remainder
  const [editedReminder, setEditedReminder] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const addReminder=()=>{
    navigate('/setremainder');
  }

  //delete remainder
  const deleteReminder = async(id) => {
    console.log(id);
    const postDoc = doc(db, "remainders", id);
    await deleteDoc(postDoc);
    getremainder();
  };

  //logout
  const logout = () => {
    signOut(auth);
    // navigate("/");
    navigate('/logout');
  };

  // javascript
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const day = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
    };

    useEffect(() => {
      getremainder();
    }, []);


    const handleDisableClick = (id,enable) => {
      const Ref = doc(db, "remainders", id);
        updateDoc(Ref, {
          enabled:!enable,
          }).then(() => {
              console.log("Updated successfully");
              getremainder();
          }).catch((e) => {
                console.log(e);
          });
    };

  return (
    <div classNameName="reminder-container">
      <button className="logout-button" onClick={logout}>Logout</button>
      <div>
        <h2>Welcome to Remainder application {user.displayName}</h2>
        <h2>Today is {day[newDate.getDay()]}, {date}th of {new Date().toLocaleString("en-US", { month: "long" })}</h2>
      </div>

      {remainders.map((post) => (
      post.userId==user.uid?
      <div className="card">
        <div className="left-part">
          <Link to={`/viewremainder/${post.id}`} className='linkstyle'>
            <div className="date">{post.date}</div>
            <div className="details">
              <div className="subject">{post.subject}</div>
              <div className="description">{post.text}</div>
            </div>
          </Link>
        </div>
        <div className="right-part">
          <button className="edit-icon">
            <Link to={`/updateremainder/${post.id}`}>&#9998;</Link>
          </button>
          <button className="delete-icon"  onClick={()=>deleteReminder(post.id)}>
            &#128465;
          </button>
          <button
            className={`disable-button ${post.enabled ? 'enabled' : 'disabled'}`}
            onClick={()=>handleDisableClick(post.id,post.enabled)}
          >
            {post.enabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>:<></>
      ))}
      <button onClick={addReminder} className='addrem'>Add Reminder</button>
    </div>
  );
};

export default ReminderComponent;
