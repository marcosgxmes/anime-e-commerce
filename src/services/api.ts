// AXIOS BASEADO NO FETCH API POR-EM COM RECURSOS A MAIS
import axios from "axios";

// json-server --watch db.json
export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_E8VgSWzg7HlWuqLMwJ50WqJuXAAfyAA",
  authDomain: "e-commerce-6b450.firebaseapp.com",
  projectId: "e-commerce-6b450",
  storageBucket: "e-commerce-6b450.firebasestorage.app",
  messagingSenderId: "441256124714",
  appId: "1:441256124714:web:57768a22b93771708f3e53",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const auth = getAuth(app);
const storage = getStorage(app);

interface MangaProps{
  title: string,
  description: string,
  price: number,
  cover: string
}

const addManga = async (manga: MangaProps) => {
  try {
    const docRef = await addDoc(collection(db, "mangas"), manga);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

fetch('https://localhost:3000/products')
  .then((response) => response.json())
  .then((mangaData) => {
    mangaData.forEach((manga: MangaProps) => {
      addManga(manga);
    });
  })
  .catch((error) => {
    console.error("Error fetching manga data", error);
  });

export { db, auth, storage };
