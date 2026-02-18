// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeOC84QxXYUf1_86XwgGgKPcAEWUzkRwA",
  authDomain: "proyectointegral-19e57.firebaseapp.com",
  projectId: "proyectointegral-19e57",
  storageBucket: "proyectointegral-19e57.firebasestorage.app",
  messagingSenderId: "944464810265",
  appId: "1:944464810265:web:f63c31db8f764e5dbe3588",
  measurementId: "G-F6Z16PJ2CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
// Agrega google provider
export const googleProvider = new GoogleAuthProvider();
export default app;