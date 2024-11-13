const bcryptjs = require('bcryptjs');
const Notification = require('../models/shared/notificationModel');
const { DELETE } = require('sequelize/lib/query-types');


// Controller logic for handling user routes
exports.getAllNotifications = async (req, res) => {
    const userid = req.params.userid;

    try {
        const notifications = await Notification.findAll({
            where: { userid: userid }
        });
        return res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const newNotification = await Notification.create(req.body);
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        } q

        return res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notification', error });
    }
};
