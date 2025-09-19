
"use client";

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "craftconnect-ai-2nd-9033-f2dd0",
  "appId": "1:1067125462903:web:d318d93559c1b41d153372",
  "apiKey": "REDACTED",
  "authDomain": "craftconnect-ai-2nd-9033-f2dd0.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1067125462903"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
