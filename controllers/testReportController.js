const TestReport = require('../models/testReportModel');
const { DELETE } = require('sequelize/lib/query-types');


// Controller logic for handling user routes
exports.getAllTestReports = async (req, res) => {

    try {
        const testReports = await TestReport.findAll();
        return res.status(200).json(testReports);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving test reports', error });
    }
};

exports.createTestReport = async (req, res) => {
    try {
        const newReport = await Order.create(req.body);
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ message: 'Error creating test report', error });
    }
};

exports.getTestReportById = async (req, res) => {
    try {
        const report = await TestReport.findByPk(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        return res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report', error });
    }
};

