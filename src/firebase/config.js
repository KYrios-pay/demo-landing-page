// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "kyrios-waitlist.firebaseapp.com",
    projectId: "kyrios-waitlist",
    storageBucket: "kyrios-waitlist.firebasestorage.app",
    messagingSenderId: "172530944847",
    appId: "1:172530944847:web:2e6ba315cea3570f16d33a",
    measurementId: "G-KR6Q1ZGN3P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
