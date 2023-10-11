// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrxgIeRx_ERoEGKLOjDg-c0iNWkM3vuys",
  authDomain: "remainder-c41cf.firebaseapp.com",
  projectId: "remainder-c41cf",
  storageBucket: "remainder-c41cf.appspot.com",
  messagingSenderId: "861168665588",
  appId: "1:861168665588:web:6a9d1da31357055404efa1"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth =getAuth(app);