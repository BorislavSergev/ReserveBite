// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJaAUH1Adl8c7K-i1jJhfDYLUjtqhM-9s",
    authDomain: "reservebite-7d336.firebaseapp.com",
    projectId: "reservebite-7d336",
    storageBucket: "reservebite-7d336.firebasestorage.app",
    messagingSenderId: "788296387113",
    appId: "1:788296387113:web:67d753f777c2808e27ea38",
    measurementId: "G-R8Z7N392KZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services for use in your app
export { app, auth, db, storage };

