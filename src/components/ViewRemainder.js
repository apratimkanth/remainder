import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';
import { Link } from "react-router-dom";

import { Timestamp, collection, addDoc,getDocs,updateDoc,doc,getDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import '../style/viewRemainder.css';

function ViewRemainder() {
    const {id}=useParams();
    let navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [post,setPost]=useState('');

    const docRef = doc(db, "remainders",id);
    const getremainder = async () => {
      try {
        const data = await getDoc(docRef);
        setPost({ ...data.data()});
      } catch (err) {
        console.log(err);
      }
    };
    const back=()=>{
      navigate('/home');
    }
    useEffect(() => {
      getremainder();
    }, []);

  return (
    <>
        <div className="reminder">
        <h2>Reminder Details</h2>
        <p><strong>Date :</strong> {post.date}</p>
        <p><strong>Subject :</strong> {post.subject}</p>
        <p><strong>Text :</strong> {post.text}</p>
        <p><strong>Email :</strong> {post.email}</p>
        <p><strong>Contact :</strong> {post.contact}</p>
        <p><strong>SMS No.:</strong> {post.sms}</p>
        <p><strong>Status :</strong> {post.enabled ? 'Disable' : 'Enable'}</p>
      </div>
      <button onClick={back}>Back</button>
      <button className="edit-icon">
        <Link to={`/updateremainder/${id}`}>&#9998;</Link>
      </button>
    </>
  )
}

export default ViewRemainder