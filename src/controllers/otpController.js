const { Op } = require('sequelize');
const OTP = require("../models/otpModel");
const { generateOTP } = require('../utils/otpGetnerator');


exports.createOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOTP(6);
        const otpModel = {
            email: email,
            otp: otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + process.env.OTP_EXPIRE_TIME * 60 * 1000
        };

        const newOTP = await OTP.create(otpModel)

        return res.status(200).json(newOTP);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const otpModel = await OTP.findOne({
        where: {
            otp: otp,
            email: email,
            expiresAt: {
                [Op.gt]: new Date(),
            },
        }
    })

    if (!otpModel) {
        return res.status(400).json({
            message: "Invalid OTP"
        });
    }

    await otpModel.destroy();

    return res.status(200).json({
        message: "OTP verified successfully",
        data: otpModel
    })

};
