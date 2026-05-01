importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

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

const CACHE_NAME = 'the-overflow-v1';
const urlsToCache = ['/', '/index.html', '/offline.html', '/manifest.json', '/icon.svg'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
                return new Response('Offline');
            });
        })
    );
});

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(
        payload.notification?.title || '✝️ THE OVERFLOW',
        {
            body: payload.notification?.body || 'Tap for your daily encouragement',
            icon: '/icon.svg',
            badge: '/icon.svg'
        }
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
