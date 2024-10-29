import { initializeApp } from 'firebase/app';
import { getAuth, signOut, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import DB from '@caju/services/db';
import Auth from '@caju/services/auth';
import UserServices from '@caju/services/user';
import AdmissionServices from '@caju/services/admission';

// VARIABLES
export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    manager: import.meta.env.VITE_MANAGER_URL,
};

export const isLocal = import.meta.env.VITE_ENV === 'local';

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
const firestore = getFirestore(app);

export const authServices = new Auth({
    signOut: () => signOut(firebaseAuth),
});

export const db = new DB(firestore);

if (isLocal) {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
}

// ENTITY SERVICES
export const userServices = new UserServices(db, url.sso);
export const admissionServices = new AdmissionServices(db);