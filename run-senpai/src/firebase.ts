import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Score } from './types';

const firebaseConfig = {
  // Firebaseの設定情報をここに入れてください
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveScore = async (playerName: string, score: number): Promise<void> => {
  try {
    const scoresRef = collection(db, 'scores');
    await addDoc(scoresRef, {
      playerName,
      score,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

export const getTopScores = async (scoreLimit: number = 10): Promise<Score[]> => {
  try {
    const scoresRef = collection(db, 'scores');
    const q = query(scoresRef, orderBy('score', 'desc'), limit(scoreLimit));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Score));
  } catch (error) {
    console.error('Error getting scores:', error);
    throw error;
  }
};
