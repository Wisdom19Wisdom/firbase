// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUaT8O1Zw3rGHmhAMIR0IwaAoBIBStuJc",
  authDomain: "firbase-texting.firebaseapp.com",
  projectId: "firbase-texting",
  storageBucket: "firbase-texting.appspot.com",
  messagingSenderId: "246205192881",
  appId: "1:246205192881:web:dd02f0db7f603e6c6ea090",
  measurementId: "G-K0D470P6XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;