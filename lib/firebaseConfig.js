import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDS0CIOR3D2xLT3kA8jB-4N8l0H9KZR-vA",
    authDomain: "active-axle-316817.firebaseapp.com",
    projectId: "active-axle-316817",
    storageBucket: "active-axle-316817.firebasestorage.app",
    messagingSenderId: "378850625567",
    appId: "1:378850625567:web:2bdfd1e77728417b43ad2a",
    measurementId: "G-X2C5CPVNBW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export { auth, provider, messaging, getToken, onMessage };


// apiKey: "AIzaSyATrPypJiU2ydHl-jk8EjbRcARgTJy-QaA",
// authDomain: "gaukrishna-be8c8.firebaseapp.com",
// projectId: "gaukrishna-be8c8",
// storageBucket: "gaukrishna-be8c8.firebasestorage.app",
// messagingSenderId: "769505189959",
// appId: "1:769505189959:web:abaabb42c9678f0f36d162",