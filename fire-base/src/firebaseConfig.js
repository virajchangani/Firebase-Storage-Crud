import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (replace with your actual config from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyAIhoCvCyrUYKE2VvgR2A8fIXJGNbVvFkU",
    authDomain: "react-e08a5.firebaseapp.com",
    projectId: "react-e08a5",
    storageBucket: "react-e08a5.appspot.com",
    messagingSenderId: "811942564236",
    appId: "1:811942564236:web:a63244d90d380faf7246a9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Auth service
const db = getFirestore(app);

export { auth,db };
