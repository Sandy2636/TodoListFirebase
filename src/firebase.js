import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGQ3DbmyUCverf7-jdzHk7cnr0aqfT9Q4",
  authDomain: "todo-list-d3e46.firebaseapp.com",
  projectId: "todo-list-d3e46",
  storageBucket: "todo-list-d3e46.appspot.com",
  messagingSenderId: "473749308035",
  appId: "1:473749308035:web:7c4556fc9ac61b95e751b6",
  measurementId: "G-4TSXZ4X7DS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
