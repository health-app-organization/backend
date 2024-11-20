const bcryptjs = require('bcryptjs');
const Notification = require('../models/shared/notificationModel');
const { paginate } = require('../utils/services');
const { DELETE } = require('sequelize/lib/query-types');


// Controller logic for handling user routes
exports.getAllNotifications = async (req, res) => {
    const { status, id } = req.params;
    const { page, count } = req.query;
    let { metadata } = req.query;

    let condition = {
        userid: id,
        type: status
    }

    metadata = page && metadata !== 'false' ? true : false;

    try {
        const notifications = await Notification.findAll({
            where: condition,

            ...paginate(page, count)
        });

        if (metadata) {
            const total = await Notification.count({
                where: condition
            });
            const totalPages = Math.ceil(total / count);
            let pagemetadata = {
                currentPage: Number(page),
                numPerPage: Number(count),
                totalPages: totalPages,
                totalItems: total
            }

            return res.status(200).json({ data: notifications, metadata: pagemetadata })
        }
        return res.status(200).json({ data: notifications });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notfications', error });
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

exports.updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        await notification.update(req.body);
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: 'Error updating notification', error });
    }
}

exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        return res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notification', error });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        await notification.destroy();
        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting notification', error });
    }
}
