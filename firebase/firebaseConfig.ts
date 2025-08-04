import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";

export const firebaseConfig = {
  apiKey: "AIzaSyBrRGU_Aw2YtGQY3v4KUBPAg0SzPxwRX_k",
  authDomain: "dycc-8b72d.firebaseapp.com",
  projectId: "dycc-8b72d",
  storageBucket: "dycc-8b72d.appspot.com",
  messagingSenderId: "640837222654",
  appId: "1:640837222654:web:1b466ae1ab279ad8b125af"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);