// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfPOcGlvCk_bL0gXNhInG7RJNRGetzr5o",
  authDomain: "firestore-auth-16157.firebaseapp.com",
  projectId: "firestore-auth-16157",
  storageBucket: "firestore-auth-16157.appspot.com",
  messagingSenderId: "613173863374",
  appId: "1:613173863374:web:8b7688fa6bc952f8ce019f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage }; // Export both Firestore and Storage instances
