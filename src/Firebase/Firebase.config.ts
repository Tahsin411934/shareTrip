
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOYh9SAlOSGrZ4PGL0191NknADWNESmow",
  authDomain: "user-auth-790e7.firebaseapp.com",
  projectId: "user-auth-790e7",
  storageBucket: "user-auth-790e7.appspot.com",
  messagingSenderId: "610025820011",
  appId: "1:610025820011:web:d31f69e105db675df3862e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the Auth service for the default app

export default auth;
