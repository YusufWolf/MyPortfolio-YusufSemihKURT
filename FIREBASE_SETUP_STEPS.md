# Firebase Setup - Step by Step

## Step 1: Go to Firebase Console
👉 https://console.firebase.google.com/

## Step 2: Create Project
1. Click **"Add project"** or **"Create a project"**
2. Enter project name: `My Portfolio` (or any name)
3. Click **Continue**
4. (Optional) Disable Google Analytics if you don't want it
5. Click **Create project**
6. Wait for setup to complete → Click **Continue**

## Step 3: Enable Realtime Database
1. In the left sidebar, click **Build** → **Realtime Database**
2. Click **Create Database**
3. Choose a location (pick closest to you, e.g., `us-central1`)
4. Click **Next**
5. **IMPORTANT**: Select **"Start in test mode"**
6. Click **Enable**

✅ You should now see your database URL (something like `https://your-project-default-rtdb.firebaseio.com/`)

## Step 4: Get Your Firebase Config
1. Click the ⚙️ **gear icon** (top left) → **Project settings**
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** (`</>`)
4. Register your app:
   - App nickname: `My Portfolio` (or any name)
   - (Optional) Check "Also set up Firebase Hosting"
   - Click **Register app**
5. You'll see a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

6. **Copy these values** - you'll need them next!

## Step 5: Create `.env` File
1. In your project root folder, create a file named `.env`
2. Add these lines (replace with YOUR values from Step 4):

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Important**: 
- No quotes around values
- No spaces around `=`
- Keep the trailing `/` in DATABASE_URL

## Step 6: Update Service Worker
1. Open `public/firebase-messaging-sw.js` in your editor
2. Find the `firebaseConfig` object (around line 9)
3. Replace ALL the placeholder values with YOUR actual values from Step 4:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",  // Your actual API key
  authDomain: "your-project.firebaseapp.com",  // Your actual domain
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",  // Your actual URL
  projectId: "your-project-id",  // Your actual project ID
  storageBucket: "your-project.appspot.com",  // Your actual bucket
  messagingSenderId: "123456789",  // Your actual sender ID
  appId: "1:123456789:web:abc123"  // Your actual app ID
};
```

## Step 7: Set Database Rules (Security)
1. Go back to Firebase Console
2. Click **Build** → **Realtime Database**
3. Click the **Rules** tab
4. Replace the rules with this:

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

5. Click **Publish**

## Step 8: Enable Cloud Messaging (For Phone Notifications) - OPTIONAL
1. In Firebase Console, click **Build** → **Cloud Messaging**
2. Click **Get started** (if you see it)
3. Click the **Cloud Messaging API (V1)** tab
4. Click **Generate key pair**
5. Copy the VAPID key (long string)
6. Add it to your `.env` file:

```env
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

## Step 9: Test It!
1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Open your site in browser
3. Check the header - you should see visitor counter
4. Look bottom-right - you should see chat button
5. Open browser console (F12) - check for any errors

## ✅ You're Done!

If everything works:
- Visitor counter shows in header
- Chat button appears bottom-right
- You can send test messages
- Check Firebase Console → Realtime Database to see the data

## 🆘 Troubleshooting

**"Firebase: Error (auth/invalid-api-key)"**
→ Check your `.env` file has correct values (no quotes, no spaces)

**"Permission denied"**
→ Check database rules are set correctly (Step 7)

**Visitor counter shows "..." forever**
→ Check browser console for errors, verify DATABASE_URL in `.env`

**Chat button doesn't appear**
→ Check browser console, verify all Firebase config values are correct

**Service worker errors**
→ Make sure `firebase-messaging-sw.js` has the same config as `.env`

---

**Need help?** Check the browser console (F12) for error messages - they usually tell you what's wrong!

