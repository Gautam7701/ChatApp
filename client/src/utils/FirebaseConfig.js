import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCgAP4EJKM-fJL2PTQYbz0eTg1BsN_ETJQ",
  authDomain: "wizzapp25.firebaseapp.com",
  projectId: "wizzapp25",
  storageBucket: "wizzapp25.firebasestorage.app",
  messagingSenderId: "738160658705",
  appId: "1:738160658705:web:d3dd379f9bddb2be1da4b0",
  measurementId: "G-YWSHBKHL4J"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);