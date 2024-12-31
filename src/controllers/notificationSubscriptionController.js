const NotificationSubscription = require("../models/shared/notificationSubscriptionModel");

exports.subscribe = async (req, res) => {
    const { userId, type, subscription, deviceToken } = req.body;

    try {
        const data = { userId, type };

        if (type === "web") {
            data.subscription = JSON.stringify(subscription);
        } else if (type === "mobile") {
            data.deviceToken = deviceToken;
        }

        await NotificationSubscription.create(data);

        res.status(201).json({ message: "Subscription saved successfully!" });
    } catch (error) {
        console.error("Error saving subscription:", error);
        res.status(500).json({ error: "Failed to save subscription." });
    }
}

exports.getSubscriptionByUserId = async (req, res) => {
    const { userid } = req.params;
    const type = req.query.type;

    try {
        const subscriptions = await NotificationSubscription.findOne({
            where: {
                userId: userid,
                type,
            }
        });

        res.status(200).json(subscriptions);
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ error: "Failed to fetch subscriptions." });
    }
}