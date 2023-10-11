import React from 'react'
import Login from './Login'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { signOut } from "firebase/auth";


const ReminderComponent = () => {
  let navigate = useNavigate();
  
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [editedReminder, setEditedReminder] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addReminder = () => {
    if (newReminder && reminderDate) {
      setReminders([...reminders, { date: reminderDate, text: newReminder, enabled: true }]);
      setNewReminder('');
      setReminderDate('');
    }

    
  };

  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  const editReminder = (index) => {
    setEditedReminder(reminders[index].text);
    setEditIndex(index);
  };

  const saveEditedReminder = () => {
    if (editedReminder) {
      const updatedReminders = [...reminders];
      updatedReminders[editIndex] = { ...updatedReminders[editIndex], text: editedReminder };
      setReminders(updatedReminders);
      setEditIndex(null);
      setEditedReminder('');
    }
  };

  const toggleReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders[index].enabled = !updatedReminders[index].enabled;
    setReminders(updatedReminders);
  };
  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="reminder-container">
      <button className="logout-button" onClick={logout}>Logout</button>
      <div>
      <h2>Reminders</h2>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editedReminder}
                  onChange={(e) => setEditedReminder(e.target.value)}
                />
                <button onClick={saveEditedReminder}>Save</button>
              </div>
            ) : (
              <span>{reminder.date} - {reminder.text}</span>
            )}
            <button onClick={() => toggleReminder(index)}>
              {reminder.enabled ? 'Disable' : 'Enable'}
            </button>
            <button onClick={() => editReminder(index)}>Edit</button>
            <button onClick={() => deleteReminder(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={reminderDate}
          onChange={(e) => setReminderDate(e.target.value)}
        />
        <br />
        <label>Subject:</label>
        <textarea
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
        />
        <br />
        <button onClick={addReminder}>Add Reminder</button>
      </div>
    </div>
    </div>
    
  );
};

export default ReminderComponent;
