# Quick Start - Real-Time Features Setup

## 🚀 What's Been Added

✅ **Real-time Visitor Counter** - Shows total visitors in the header  
✅ **Chat Widget** - "Chat with me" button in bottom-right corner  
✅ **Push Notifications** - Get notified when someone sends a message  

## 📋 Setup Steps (5 minutes)

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it (e.g., "My Portfolio")
4. Continue through the setup

### 2. Enable Realtime Database
1. In Firebase Console → **Build** → **Realtime Database**
2. Click **Create Database**
3. Choose location → **Start in test mode** → **Enable**

### 3. Get Your Firebase Config
1. Firebase Console → ⚙️ **Project Settings** → **General**
2. Scroll to **Your apps** → Click **Web** icon (`</>`)
3. Register app → Copy the config values

### 4. Create `.env` File
Create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com/
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Update Service Worker
Open `public/firebase-messaging-sw.js` and replace the config:

```javascript
const firebaseConfig = {
  apiKey: "your_api_key_here",
  authDomain: "your_project.firebaseapp.com",
  databaseURL: "https://your_project-default-rtdb.firebaseio.com/",
  projectId: "your_project_id",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};
```

### 6. Enable Cloud Messaging (For Phone Notifications)
1. Firebase Console → **Build** → **Cloud Messaging**
2. Click **Get started**
3. Go to **Cloud Messaging API (V1)** tab
4. Click **Generate key pair** → Copy the VAPID key
5. Add to `.env`:
```env
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

### 7. Set Database Rules
Firebase Console → **Realtime Database** → **Rules** tab:

```json
{
  "rules": {
    "visitors": {
      ".read": true,
      ".write": true
    },
    "visitorCount": {
      ".read": true,
      ".write": true
    },
    "chat": {
      ".read": true,
      ".write": true
    },
    "notifications": {
      ".read": true,
      ".write": true
    }
  }
}
```

### 8. Test It!
```bash
npm run dev
```

1. Open your site
2. Check header for visitor counter
3. Click chat button (bottom-right)
4. Send a test message
5. Check Firebase Console → Realtime Database to see data

## 📱 Getting Notifications on Your Phone

### Option 1: Browser Notifications (Easiest)
- When you visit your site, allow notifications
- You'll get browser notifications when someone chats
- Works on desktop and mobile browsers

### Option 2: Push to Phone App
You'll need a backend service to send push notifications. Options:
- **Firebase Cloud Functions** (recommended)
- **Vercel/Netlify Functions**
- **Node.js server**

See `FIREBASE_SETUP.md` for detailed instructions.

## 🎨 Features

### Visitor Counter
- Shows in header next to social icons
- Updates in real-time
- Counts unique sessions (one per browser session)

### Chat Widget
- Floating button: "Chat with me"
- Real-time messaging
- Name and email fields
- Messages stored in Firebase
- Notifications sent when new message arrives

### Notifications
- Browser push notifications
- Works even when site is closed (if service worker is active)
- Shows message preview

## 🔒 Security Note

The current setup uses **test mode** rules (open read/write). For production:
1. Add Firebase Authentication
2. Restrict write access
3. Add rate limiting
4. Add spam protection

## ❓ Troubleshooting

**Visitor counter not showing?**
- Check `.env` file has correct values
- Check browser console for errors
- Verify Realtime Database is enabled

**Chat not working?**
- Check database rules allow writes
- Check browser console
- Verify Firebase config

**Notifications not working?**
- Check service worker is registered (DevTools → Application → Service Workers)
- Verify VAPID key is correct
- Check notification permissions
- Site must be on HTTPS (or localhost)

## 📚 Need More Help?

See `FIREBASE_SETUP.md` for detailed documentation.

