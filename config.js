import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMSvq6h7l_jGLKt02THWQsqcmXQMX9lqc",
  authDomain: "weatherapp-fe698.firebaseapp.com",
  databaseURL:
    "https://weatherapp-fe698-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weatherapp-fe698",
  storageBucket: "weatherapp-fe698.appspot.com",
  messagingSenderId: "471343705076",
  appId: "1:471343705076:web:a25a2410fd8c949c6627a1",
  measurementId: "G-CDJG13YNQ0",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };
