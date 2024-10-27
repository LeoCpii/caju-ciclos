import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import DB from '@caju/services/db';
import Auth from '@caju/services/auth';
import UserServices from '@caju/services/user';
import CandidatesServices from '@caju/services/candidates';

// VARIABLES
export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    manager: import.meta.env.VITE_MANAGER_URL,
};

// FIREBASE
const app = initializeApp({
    appId: import.meta.env.VITE_ID,
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
}, 'manager');

// FIREBASE SERVICES
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const authServices = new Auth({
    googleAuth: () => signInWithPopup(firebaseAuth, googleProvider),
    signout: () => signOut(firebaseAuth),
});

export const db = new DB(getFirestore(app));

// ENTITY SERVICES
export const userServices = new UserServices(db, url.sso);
export const candidatesServices = new CandidatesServices(db);