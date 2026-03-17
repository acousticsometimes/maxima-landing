import { initializeApp } from 'firebase/app';
import { getFirestore }   from 'firebase/firestore';
import { getStorage }     from 'firebase/storage';

// ── SAME VALUES AS DASHBOARD ─────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCzBJ4Rsor9vAcrAggSVleFqsgZMVNZv4c",
  authDomain: "maxima-prospera.firebaseapp.com",
  projectId: "maxima-prospera",
  storageBucket: "maxima-prospera.firebasestorage.app",
  messagingSenderId: "369031990339",
  appId: "1:369031990339:web:fa562e87a49a95c90618f6",
  measurementId: "G-RSK2WPSQ86"
};
// ─────────────────────────────────────────────────────────────────

const app = initializeApp(firebaseConfig);

export const db      = getFirestore(app);
export const storage = getStorage(app);

export default app;