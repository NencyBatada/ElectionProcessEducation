import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  projectId: "prompt-wars-493105",
  // Other keys would be populated via environment variables in production
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: "prompt-wars-493105.firebaseapp.com",
  storageBucket: "prompt-wars-493105.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics uses window checks to prevent crashing in non-browser environments
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
