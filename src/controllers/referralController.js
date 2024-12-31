const Referral = require('../models/providers/referralModel');
const User = require('../models/users/userModel');
const Clinic = require('../models/providers/clinicModel');
const { sendNotification } = require('./notificationController');
const { sendEmail } = require('../services/email.service')

exports.getReferrals = async (req, res) => {
    try {
        const referrals = await Referral.findAll();
        res.status(200).json(referrals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getReferralsByUserId = async (req, res) => {
    try {
        const referrals = await Referral.findAll({
            where: {
                userId: req.params.userId
            }
        });
        res.status(200).json(referrals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createReferral = async (req, res) => {
    try {
        const referral = await Referral.create(req.body);



        let user = await User.findByPk(req.body.userId, {
            attributes: ['id', 'email']
        });

        let provider = await User.findByPk(req.body.providerId, {
            attributes: ['id', 'email', 'firstName', 'lastName', 'phoneNumber']
        })

        let clinic = await Clinic.findByPk(req.body.clinicId, {
            attributes: ['id', 'name', 'address', 'phone']
        })

        let payload = {
            title: "Referral Notice",
            body: `you have been referred to ${clinic.name} at ${clinic.address}(${clinic.phone}) by ${provider.fullName}(${provider.phoneNumber})`,
            icon: '/images/ason-logo.jpg'
        }

        sendNotification('user', req.body.userId, payload);

        //Send email to the user
        let emailStatus = await sendEmail(user.email,
            'Referral Notice',
            payload.body,
            null
        );

        console.log(emailStatus);

        //Send notification to the clinic

        //Send email to the clinic

        return res.status(201).json(referral);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}