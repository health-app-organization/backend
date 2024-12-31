const Reminder = require('../models/users/reminderModel');
const Medicine = require('../models/users/medicineModel');
const { addReminders, initializeReminders } = require('../scheduler/nodeScheduler');

// Reminder Controller
const reminderController = {
    // Get all reminders
    async getAllReminders(req, res) {
        try {
            const reminders = await Reminder.findAll({
                include: [
                    {
                        model: Medicine,
                        as: 'medicine',
                        attributes: ['id', 'name', 'dose'],
                    },
                ],
            });
            return res.status(200).json({ reminders });
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching reminders', error: error.message });
        }
    },

    // Create a new reminder
    async createReminder(req, res) {
        try {
            const { time, status, medicineId } = req.body;

            if (!time || !medicineId) {
                return res.status(400).json({ message: 'Time and medicineId are required' });
            }

            const newReminder = await Reminder.create(req.body);

            addReminders(newReminder.id);

            return res.status(201).json({ message: 'Reminder created successfully', newReminder });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating reminder', error: error.message });
        }
    },

    // Update a reminder
    async updateReminder(req, res) {
        try {
            const { id } = req.params;
            const { time, status } = req.body;

            const reminder = await Reminder.findByPk(id);
            if (!reminder) {
                return res.status(404).json({ message: 'Reminder not found' });
            }

            await reminder.update({ time, status });

            initializeReminders();

            return res.status(200).json({ message: 'Reminder updated successfully', reminder });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating reminder', error });
        }
    },

    // Delete a reminder
    async deleteReminder(req, res) {
        try {
            const { id } = req.params;

            const reminder = await Reminder.findByPk(id);
            if (!reminder) {
                return res.status(404).json({ message: 'Reminder not found' });
            }

            await reminder.destroy();
            return res.status(200).json({ message: 'Reminder deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting reminder', error });
        }
    },
};

module.exports = reminderController;
