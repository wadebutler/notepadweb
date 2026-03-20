import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAo_kMfbcdHh-qJkVTX47sTedgnyTHHwlE",
  authDomain: "notepad-3782e.firebaseapp.com",
  databaseURL: "https://notepad-3782e-default-rtdb.firebaseio.com",
  projectId: "notepad-3782e",
  storageBucket: "notepad-3782e.firebasestorage.app",
  messagingSenderId: "567234412891",
  appId: "1:567234412891:web:5531ba6b9490eff43a9a7e",
  measurementId: "G-CTMPM90YZX",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
