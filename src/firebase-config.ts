import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAIegO1UvYnGhyaI-lMzaZmW9NHISQxj8w",
    authDomain: "passwordssystem-73c2f.firebaseapp.com",
    databaseURL: 'https://passwordssystem-73c2f-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: "passwordssystem-73c2f",
    storageBucket: "passwordssystem-73c2f.firebasestorage.app",
    messagingSenderId: "316900752253",
    appId: "1:316900752253:web:dd736fa1f8741daaccaa14",
    measurementId: "G-264M6L5PCD"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);