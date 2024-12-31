// Listen for the 'push' event
self.addEventListener('push', (event) => {
    console.log('Push received:', event);

    // Extract notification data from the event
    const data = event.data ? event.data.json() : {};

    // Set default values if no data is provided
    const title = data.title || 'Default Title';
    const options = {
        body: data.body || 'Default body content',
        icon: data.icon || '/default-icon.png', // Optional: path to an icon
        badge: data.badge || '/default-badge.png', // Optional: smaller icon for devices
    };

    // Show the notification
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);

    event.notification.close(); // Close the notification

    // Perform some action when the notification is clicked
    event.waitUntil(
        clients.openWindow('/chat') // Replace with the desired URL to open
    );
});

// Optional: Handle 'pushsubscriptionchange' event
self.addEventListener('pushsubscriptionchange', (event) => {
    console.log('Push subscription changed:', event);

    // Resubscribe logic can be added here if needed
});
