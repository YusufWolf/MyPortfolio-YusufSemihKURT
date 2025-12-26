# Firebase Setup Guide

Follow these steps to set up Firebase for your real-time website features.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter project name
   - Enable/disable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Realtime Database

1. In Firebase Console, go to **Build** > **Realtime Database**
2. Click **Create Database**
3. Choose a location (closest to your users)
4. Start in **test mode** (we'll secure it later)
5. Click **Enable**

## Step 3: Get Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "My Portfolio")
5. Copy the Firebase configuration object

## Step 4: Set Up Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com/
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 5: Enable Cloud Messaging (For Push Notifications)

1. In Firebase Console, go to **Build** > **Cloud Messaging**
2. Click **Get started** (if not already enabled)
3. Go to **Cloud Messaging API (V1)** tab
4. Click **Generate key pair** to create a VAPID key
5. Copy the VAPID key and add it to your `.env`:

```env
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

## Step 6: Update Service Worker

1. Open `public/firebase-messaging-sw.js`
2. Replace the Firebase config with your actual values (same as in `.env`)
3. **Important**: Use the same config values as your main app

## Step 7: Set Up Database Rules (Security)

1. Go to **Realtime Database** > **Rules** tab
2. Update the rules to allow read/write for chat and visitors:

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
    },
    "admin": {
      ".read": false,
      ".write": false
    }
  }
}
```

**Note**: These are permissive rules for testing. For production, you should:
- Add authentication
- Restrict write access to specific paths
- Use Firebase Authentication to secure admin operations

## Step 8: Test Your Setup

1. Run `npm run dev`
2. Open your website
3. Check the browser console for any Firebase errors
4. Test the visitor counter (should increment)
5. Test the chat widget (send a message)
6. Check Firebase Console > Realtime Database to see the data

## Step 9: Set Up Push Notifications (Optional - For Phone Notifications)

### For Web Push Notifications:

1. The service worker is already set up in `public/firebase-messaging-sw.js`
2. When a user visits your site, they'll be asked for notification permission
3. If granted, you'll receive their FCM token in Firebase Database under `admin/fcmToken`

### To Send Notifications from Your Phone:

You have several options:

#### Option A: Use Firebase Console (Manual)
1. Go to **Cloud Messaging** > **Send test message**
2. Enter the FCM token
3. Send a test notification

#### Option B: Use Firebase Admin SDK (Automated)
Create a simple backend service that:
- Listens to new messages in `chat/messages`
- Sends push notifications using Firebase Admin SDK
- Can be deployed on Vercel, Netlify Functions, or a Node.js server

#### Option C: Use a Third-Party Service
- Use services like Pushover, Pushbullet, or IFTTT
- Set up webhooks to trigger notifications

## Troubleshooting

### Visitor Counter Not Working
- Check Firebase config in `.env`
- Check browser console for errors
- Verify Realtime Database is enabled
- Check database rules allow read/write

### Chat Not Working
- Check Firebase config
- Verify database rules allow chat writes
- Check browser console for errors

### Push Notifications Not Working
- Ensure service worker is registered (check Application tab in DevTools)
- Verify VAPID key is correct
- Check notification permissions in browser
- Ensure HTTPS (required for service workers)

### Service Worker Not Registering
- Make sure `firebase-messaging-sw.js` is in the `public` folder
- Check that the file is being served (visit `/firebase-messaging-sw.js` in browser)
- Clear browser cache and reload

## Production Considerations

1. **Security Rules**: Update database rules to be more restrictive
2. **Authentication**: Add Firebase Auth for admin features
3. **Rate Limiting**: Implement rate limiting for chat messages
4. **Spam Protection**: Add CAPTCHA or rate limiting
5. **HTTPS**: Ensure your site uses HTTPS (required for service workers)
6. **Environment Variables**: Don't commit `.env` file to Git

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
- [Firebase Cloud Messaging Guide](https://firebase.google.com/docs/cloud-messaging)

