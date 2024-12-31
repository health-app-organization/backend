const Drug = require('../models/shared/drugModel');
const Prescription = require('../models/shared/prescriptionModel');

exports.createPrescription = async (req, res) => {
    try {
        const prescription = await Prescription.create(req.body, {
            include: [{
                model: Drug,
                as: 'drugs'
            }]
        })

        return res.status(200).json(prescription);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getPrescriptionByUserId = async (req, res) => {
    const { status, id } = req.params;

    let condition;

    if (status === 'user')
        condition = { userId: id }
    else if (status === 'provider') {
        condition = { providerId: id }
    }

    try {
        const prescriptions = await Prescription.findAll({
            where: condition,
            include: {
                model: Drug,
                as: 'drugs'
            }
        })

        return res.status(200).json({ message: 'Prescription created sucessfully', data: prescriptions })
    } catch (error) {
        return res.status(500).json({ message: 'Prescription creation failed', error: error.message })
    }
}