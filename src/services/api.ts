// AXIOS BASEADO NO FETCH API POR-EM COM RECURSOS A MAIS
import axios from 'axios'

// json-server --watch db.json
export const api = axios.create({
  baseURL: "http://localhost:3000"
})

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyD_E8VgSWzg7HlWuqLMwJ50WqJuXAAfyAA",
  authDomain: "e-commerce-6b450.firebaseapp.com",
  projectId: "e-commerce-6b450",
  storageBucket: "e-commerce-6b450.firebasestorage.app",
  messagingSenderId: "441256124714",
  appId: "1:441256124714:web:57768a22b93771708f3e53"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage}