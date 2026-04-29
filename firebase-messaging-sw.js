// firebase-messaging-sw.js - Place this file in the root of your website
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Your Firebase config (SAME as your main site)
const firebaseConfig = {
    apiKey: "AIzaSyDvRhyUOOzp3eF5GOeu_cG6n39CzcwfaEY",
    authDomain: "overflow1-0.firebaseapp.com",
    projectId: "overflow1-0",
    storageBucket: "overflow1-0.firebasestorage.app",
    messagingSenderId: "94130528938",
    appId: "1:94130528938:web:653bdeaaf084ee6fbf26d3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);
    
    const notificationTitle = payload.notification?.title || '✝️ THE OVERFLOW';
    const notificationOptions = {
        body: payload.notification?.body || 'Tap to read your daily encouragement',
        icon: 'https://your-github-pages-url/icon.png',
        badge: 'https://your-github-pages-url/badge.png',
        vibrate: [200, 100, 200],
        data: {
            click_action: payload.fcmOptions?.link || payload.data?.link || 'https://your-github-pages-url/'
        }
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    let clickUrl = event.notification.data?.click_action || 'https://your-github-pages-url/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url === clickUrl && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(clickUrl);
                }
            })
    );
});
