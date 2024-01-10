// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjcLEvMn78se8oE-8akTnOZhtbwE2o7ro",
  authDomain: "my-react-project-d9505.firebaseapp.com",
  projectId: "my-react-project-d9505",
  storageBucket: "my-react-project-d9505.appspot.com",
  messagingSenderId: "699966970850",
  appId: "1:699966970850:web:b00fa389110f032d6d77bb"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const provider = new GoogleAuthProvider();

 export const db = getFirestore(app);