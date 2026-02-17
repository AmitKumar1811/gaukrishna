"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    } catch (error) {
        console.error("Google login error:", error);
        throw error;
    }
};

