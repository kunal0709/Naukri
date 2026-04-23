import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvUxAqK8qZPFA40M3lb54LoCVA7O3upd4",
  authDomain: "react-job-portal-47447.firebaseapp.com",
  projectId: "react-job-portal-47447",
  storageBucket: "react-job-portal-47447.firebasestorage.app",
  messagingSenderId: "968533913922",
  appId: "1:968533913922:web:df3eb30e45b6917b3a18db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export auth and provider for use in other files
export { auth, provider };
