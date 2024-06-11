
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCiedoS1bEcrp5nLuP91Sax4oZuaLUfikI",
  authDomain: "documents-2c870.firebaseapp.com",
  projectId: "documents-2c870",
  storageBucket: "documents-2c870.appspot.com",
  messagingSenderId: "922236839093",
  appId: "1:922236839093:web:2bf9614a1b4bd03a0f0afc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)