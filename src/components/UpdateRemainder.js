import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';

import { Timestamp, collection, addDoc,getDocs,updateDoc,doc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function UpdateRemainder() {
    const {id}=useParams();
    let navigate = useNavigate();
    const [user] = useAuthState(auth);
  
    const [date, setDate] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
  
    const handleSubjectChange = (e) => {
      setSelectedSubject(e.target.value);
    };
    const subjects = ['Math', 'Science', 'History', 'English', 'Other'];
  
    //update remainder
    const UpdateReminder=()=>{
        const Ref = doc(db, "remainders", id);
        updateDoc(Ref, {
            date: date,
            subject:selectedSubject,
            text:description,
            email:email,
            contact:contactNo,
            sms:smsNo,
          }).then(() => {
              console.log("Updated successfully");
              navigate('/home');
          }).catch((e) => {
                console.log(e);
          });
    }

  
    return (
      <div className="form-container">
        <div className="form-group">
          <label>
            Select a Date: <FontAwesomeIcon icon={faCalendar} />
          </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Select</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Add Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contact No:</label>
          <input type="tel" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
        </div>
        <div className="form-group">
          <label>SMS No:</label>
          <input type="tel" value={smsNo} onChange={(e) => setSmsNo(e.target.value)} />
        </div>
        <br />
        <button onClick={UpdateReminder}>Update</button>
        <button onClick={()=>{navigate('/home')}}>Back</button>
      </div>
    );
}

export default UpdateRemainder