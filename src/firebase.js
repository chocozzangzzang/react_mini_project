// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.REACT_APP_projectID,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};*/

const firebaseConfig = {
  apiKey: "AIzaSyAt4lzH66Shl792RKv8gzPL-1rwvGfHE54",
  authDomain: "fir-test-411d9.firebaseapp.com",
  databaseURL: "https://fir-test-411d9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-test-411d9",
  storageBucket: "fir-test-411d9.appspot.com",
  messagingSenderId: "482275209028",
  appId: "1:482275209028:web:8edd63743d07d17da83111",
  measurementId: "G-7B8ER61VJ1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export {firebaseApp, db, firebaseStorage};