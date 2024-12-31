const webpush = require("web-push");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const NotificationSubscription = require("../models/shared/notificationSubscriptionModel");

dotenv.config();

// Configure VAPID keys
webpush.setVapidDetails(
    "mailto:awarabraham37@gmail.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

admin.initializeApp({
    credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
});


sendWebNotification = async (subscription, payload) => {
    try {
        const sub = JSON.parse(subscription.subscription);
        await webpush.sendNotification(sub, JSON.stringify(payload));

        console.log("Web notification sent!");
    } catch (error) {
        console.error("Error sending web notification:", error);
    }
};

sendMobileNotification = async (subscription, payload) => {
    try {

        await admin.messaging().send({
            token: subscription.deviceToken,
            notification: payload.body,
        });

        console.log("Mobile notification sent!");
    } catch (error) {
        console.error("Error sending mobile notification:", error);
    }
};

exports.pushNotification = async (userId, payload) => {
    const subscriptions = await NotificationSubscription.findAll({
        where: { userId },
    });

    for (const subscription of subscriptions) {
        if (subscription.type === "web") {
            await sendWebNotification(subscription, payload);
        } else if (subscription.type === "mobile") {
            await sendMobileNotification(subscription, payload);
        }
    }
}


