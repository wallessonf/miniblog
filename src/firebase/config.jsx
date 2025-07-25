import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPX267ulBBAcjW30hu7_ORXhIIs3NoJr0",
  authDomain: "miniblog-eeb08.firebaseapp.com",
  projectId: "miniblog-eeb08",
  storageBucket: "miniblog-eeb08.firebasestorage.app",
  messagingSenderId: "239612549607",
  appId: "1:239612549607:web:311b015b3eadc69edd8542"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };