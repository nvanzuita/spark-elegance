import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcVyIDvHpKwUNj-yOfL1_OrZKaPLk0d_M",
  authDomain: "brunabeauty-academy.firebaseapp.com",
  projectId: "brunabeauty-academy",
  storageBucket: "brunabeauty-academy.firebasestorage.app",
  messagingSenderId: "846795806792",
  appId: "1:846795806792:web:d8ef5828a6b99ce75c607d"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias para usarmos nos componentes
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;