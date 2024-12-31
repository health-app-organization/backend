// Check if the browser supports notifications
if ('Notification' in window) {
    // Request permission to show notifications
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');

            // Test notification
            new Notification('Test Notification', {
                body: 'This is a test web notification!',
                icon: 'https://example.com/icon.png', // Optional icon
            });
        } else {
            console.log('Notification permission denied.');
        }
    });
} else {
    console.error('Browser does not support notifications.');
}

const userId = document.getElementById('notification').value;
let subscription;

console.log(userId);

fetch(`/notifications/get_subscriptions/${userId}?type=web`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}).then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to get subscriptions.');
    }
}).then(data => {
    subscription = data;

    if (subscription) {
        console.log('Subscription found:', subscription);
        return;
    }

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('js/service-worker.js').then(reg => {
            console.log('Service Worker registered:', reg);

            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BDmLmrPHBXrlf0WQvJKHMzKz7QSp_EJnyAgLI1oeYvT0D7aHO0x3yc5muKHGiOLQPg5nNQMIG0BYrRevzdvl9hs',
            }).then(subscription => {
                console.log('User is subscribed:', subscription);

                // Send the subscription to your server
                fetch('/notifications/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        type: 'web',
                        subscription: subscription,
                    }),
                });

            });
        });
    }
})

