const Provider = require('../models/providers/providerModel');
const Appointment = require('../models/users/appointmentModel');
const { paginate } = require('../utils/services');

exports.getAppointments = async (req, res) => {
    const { page, count, state } = req.query;
    let { metadata } = req.query;

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
                    ],
                }],

                where: state ? { status: state } : {},

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

        res.status(200).json({ data: appointments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAppointmentsByUserId = async (req, res) => {
    const { status, id } = req.params;
    const { page, count, state } = req.query;
    let { metadata } = req.query;

    if (page && metadata !== 'false')
        metadata = true;
    if (metadata === 'false')
        metadata = false

    let condition = {};
    if (status === 'user')
        condition = { userId: id };
    else if (status === 'provider')
        condition = { providerId: id };

    if (state)
        condition = { ...condition, status: state };

    try {
        const appointments = await Appointment.findAll({
            where: condition,

            include: [{
                model: Provider,
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'middleName',
                    'category'
                ],
            }],

            ...paginate(page, count),

            order: [['dateTime', 'DESC']]
        })

        if (metadata) {
            const total = await Appointment.count({
                where: condition
            });
            const totalPages = Math.ceil(total / count);
            let pagemetadata = {
                currentPage: Number(page),
                numPerPage: Number(count),
                totalPages: totalPages,
                totalItems: total
            }

            return res.status(200).json({ data: appointments, metadata: pagemetadata })
        }

        return res.status(200).json({ data: appointments })
    } catch (error) {
        return res.status(500).json({ error });
    }
}

exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await appointment.update(req.body);


        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
}
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message, error });
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