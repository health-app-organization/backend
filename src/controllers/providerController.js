const Department = require('../models/providers/departmentModel');
const Experience = require('../models/providers/experienceModel');
const Provider = require('../models/providers/providerModel');
const Review = require('../models/providers/reviewModel');
const Specialization = require('../models/providers/specializationModel');
const Availability = require('../models/providers/availabilityModel');
const { paginate, getFields } = require('../utils/services');


// Controller logic for handling user routes
exports.getAllProviders = async (req, res) => {
    const { page, count, fields } = req.query;
    let { metadata } = req.query

    metadata = page && metadata !== 'false' ? true : false;

    try {
        const providers = await Provider.findAll(
            {
                include: [{
                    model: Specialization,
                    attributes: ['name']
                }, {
                    model: Department,
                    attributes: ['name']
                }
                ],

                ...paginate(page, count),

                attributes: fields ? ['id', ...getFields(fields)] : { exclude: ['password'] },
            }
        );


        if (metadata) {
            const total = await Provider.count();
            const totalPages = Math.ceil(total / count);
            let pagemetadata = {
                currentPage: Number(page),
                numPerPage: Number(count),
                totalPages: totalPages,
                totalItems: total
            }

            return res.status(200).json({ data: providers, metadata: pagemetadata });
        }

        return res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving providers', error });
    }
};

exports.createProvider = async (req, res) => {
    try {
        const newProvider = await Provider.create(req.body);
        res.status(201).json(newProvider);
    } catch (error) {
        res.status(400).json({ message: 'Error creating providers', error });
    }
};

exports.getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id, {
            include: [{
                model: Specialization,
                attributes: ['name']
            }, {
                model: Department,
                attributes: ['name']
            },
            {
                model: Review,
                attributes: ['rating', 'review']
            }, {
                model: Experience
            }, {
                model: Availability,
                attributes: ['dayOfWeek', 'startTime', 'endTime', 'service']
            }

            ]
        });
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        return res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching provider', error });
    }
};

exports.updateProvider = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        await provider.update(req.body);
        return res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ message: 'Error updating provider', error });
    }
}

exports.deleteProvider = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        await provider.destroy();
        return res.status(200).json({ message: 'Provider deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting provider', error });
    }
}
