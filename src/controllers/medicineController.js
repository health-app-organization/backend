const Medicine = require('../models/users/medicineModel');
const Reminder = require('../models/users/reminderModel');
const { initializeReminders } = require('../scheduler/nodeScheduler');

// Medicine Controller
const medicineController = {
    // Get all medicines
    async getAllMedicines(req, res) {
        try {
            const medicines = await Medicine.findAll({
                include: [
                    {
                        model: Reminder,
                        as: 'reminders',
                        attributes: ['id', 'time', 'status'],
                    },
                ],
            });
            return res.status(200).json(medicines);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching medicines', error });
        }
    },

    // Create a new medicine
    async createMedicine(req, res) {
        try {
            const { name, dose, startDate, userId, reminders } = req.body;

            if (!name || !dose || !userId) {
                return res.status(400).json({ message: 'Name, dose, and userId are required' });
            }

            const newMedicine = await Medicine.create({
                name,
                dose,
                startDate,
                userId,
                reminders,
            }, {
                include: [{
                    model: Reminder,
                    as: 'reminders'
                }]
            });

            initializeReminders();

            return res.status(201).json({ message: 'Medicine created successfully', newMedicine });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating medicine', errorMessage: error.message });
        }
    },

    // Update a medicine
    async updateMedicine(req, res) {
        try {
            const { id } = req.params;
            const { name, dose, startDate } = req.body;

            const medicine = await Medicine.findByPk(id);
            if (!medicine) {
                return res.status(404).json({ message: 'Medicine not found' });
            }

            await medicine.update({ name, dose, startDate });
            return res.status(200).json({ message: 'Medicine updated successfully', medicine });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating medicine', error });
        }
    },

    // Delete a medicine
    async deleteMedicine(req, res) {
        try {
            const { id } = req.params;

            const medicine = await Medicine.findByPk(id);
            if (!medicine) {
                return res.status(404).json({ message: 'Medicine not found' });
            }

            await medicine.destroy();
            return res.status(200).json({ message: 'Medicine deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting medicine', error });
        }
    },
};

module.exports = medicineController;
