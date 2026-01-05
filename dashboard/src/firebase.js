import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBXCsErh57YFtDktAWWcQnrOeb8jwKZ6RY",
  authDomain: "jemuran-otomatis-v2-c8cdb.firebaseapp.com",
  databaseURL: "https://jemuran-otomatis-v2-c8cdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jemuran-otomatis-v2-c8cdb",
  storageBucket: "jemuran-otomatis-v2-c8cdb.firebasestorage.app",
  messagingSenderId: "587194777518",
  appId: "1:587194777518:web:d1662648a7c08583af923f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set };
