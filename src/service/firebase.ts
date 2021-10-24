import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";
import "firebase/functions";

initializeApp({
  apiKey: process.env.HGS_FIREBASE_API_KEY,
  authDomain: process.env.HGS_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.HGS_FIREBASE_DATABASE_URL,
  projectId: process.env.HGS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.HGS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.HGS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.HGS_FIREBASE_APP_ID,
  measurementId: process.env.HGS_MEASUREMENT_ID,
});

export const db = getFirestore();
