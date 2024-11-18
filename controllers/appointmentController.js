const Provider = require('../models/providers/providerModel');
const Appointment = require('../models/users/appointmentModel');
const { paginate } = require('../utils/services');

exports.getAppointments = async (req, res) => {
    let { page, count, metadata } = req.query;

    if (page && metadata !== false)
        metadata = true;

    try {
        const appointments = await Appointment.findAll(
            {
                include: [{
                    model: Provider,
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'middleName',
                        'category'
                    ]
                }],

                ...paginate(page, count),

                order: [['dateTime', 'DESC']]
            }
        );

        if (metadata) {
            const total = await Appointment.count();
            const totalPages = Math.ceil(total / count);
            let pagemetadata = {
                currentPage: Number(page),
                numPerPage: Number(count),
                totalPages: totalPages,
                totalItems: total
            }

            return res.status(200).json({ data: appointments, metadata: pagemetadata });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}