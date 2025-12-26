import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your Firebase configuration
// You'll need to replace these with your actual Firebase project credentials
// Get them from: Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const database = getDatabase(app);

// Initialize Cloud Messaging (for push notifications)
let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.warn('Firebase Messaging not supported:', error);
  }
}

// Request notification permission and get FCM token
export async function requestNotificationPermission(): Promise<string | null> {
  if (!messaging) return null;
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });
      return token;
    }
  } catch (error) {
    console.error('Error getting notification token:', error);
  }
  return null;
}

// Listen for foreground messages
export function onMessageListener() {
  return new Promise((resolve) => {
    if (!messaging) {
      resolve(null);
      return;
    }
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
}

export { messaging };
export default app;

