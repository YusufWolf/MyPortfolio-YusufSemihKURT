import { useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database, requestNotificationPermission, onMessageListener } from '../firebase/config';

export function NotificationHandler() {
  useEffect(() => {
    // Request notification permission on component mount
    const setupNotifications = async () => {
      const token = await requestNotificationPermission();
      if (token) {
        // Store the token in Firebase (you can use this to send targeted notifications)
        const tokenRef = ref(database, 'admin/fcmToken');
        set(tokenRef, token);
        console.log('FCM Token:', token);
      }
    };

    setupNotifications();

    // Listen for foreground messages (when app is open)
    onMessageListener()
      .then((payload: any) => {
        if (payload) {
          // Show browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(payload.notification?.title || 'New Message', {
              body: payload.notification?.body || 'You have a new message',
              icon: '/profile-picture.png',
              badge: '/profile-picture.png',
              tag: 'chat-message',
              requireInteraction: true
            });
          }
        }
      })
      .catch((err) => console.error('Error in message listener:', err));

    // Listen for new chat messages and send notifications
    const notificationsRef = ref(database, 'notifications');
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const notifications = snapshot.val();
        const unreadNotifications = Object.values(notifications).filter(
          (notif: any) => !notif.read
        );

        if (unreadNotifications.length > 0 && 'Notification' in window && Notification.permission === 'granted') {
          const latestNotification = unreadNotifications[unreadNotifications.length - 1] as any;
          
          // Show notification
          new Notification('New Chat Message', {
            body: `${latestNotification.name}: ${latestNotification.message.substring(0, 50)}${latestNotification.message.length > 50 ? '...' : ''}`,
            icon: '/profile-picture.png',
            badge: '/profile-picture.png',
            tag: 'chat-message',
            requireInteraction: true
          });

          // Mark as read (optional - you might want to keep them unread until you check)
          // const notificationKey = Object.keys(notifications).find(
          //   key => notifications[key] === latestNotification
          // );
          // if (notificationKey) {
          //   set(ref(database, `notifications/${notificationKey}/read`), true);
          // }
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null; // This component doesn't render anything
}

