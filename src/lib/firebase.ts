import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
} satisfies FirebaseOptions;

let firestore: Firestore | null | undefined;

export function getFirestoreDb(): Firestore | null {
  if (firestore !== undefined) {
    return firestore;
  }

  const isConfigured = Object.values(firebaseConfig).every(
    (value) => typeof value === 'string' && value.trim().length > 0
  );

  if (!isConfigured) {
    console.info('Firebase is not configured. Article interactions are disabled.');
    firestore = null;
    return firestore;
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  firestore = getFirestore(app);

  return firestore;
}
