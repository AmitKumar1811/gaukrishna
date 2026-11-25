import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyATrPypJiU2ydHl-jk8EjbRcARgTJy-QaA",
    authDomain: "gaukrishna-be8c8.firebaseapp.com",
    projectId: "gaukrishna-be8c8",
    storageBucket: "gaukrishna-be8c8.firebasestorage.app",
    messagingSenderId: "769505189959",
    appId: "1:769505189959:web:abaabb42c9678f0f36d162",
    measurementId: "G-X2C5CPVNBW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export { auth, provider, messaging, getToken, onMessage };
