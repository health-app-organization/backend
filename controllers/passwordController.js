const { where } = require('sequelize');
const User = require('../models/userModel');
const crypto = require('crypto');
const dotenv = require('dotenv');
const { env } = require('process');

dotenv.config();
const env = process.env;

// Forgot password logic
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne(
            {
                attributes: ['id', 'email'],
                where: { email: req.body.email }
            }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a password reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        const expirationTime = env.PASSWORD_RESET_TOKEN_EXPIRE_TIME * 60 * 1000; // Token expires in 1 hour

        const token = jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        //TODO
        //verify email
        //generate a jwt token 
        //send response with token





        // Send reset token via email (you'd typically integrate an email service here)
        // sendEmail(user.email, resetToken);

        res.status(200).json({ message: 'Password reset token sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Change password logic (after receiving token)
exports.changePassword = async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.body.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the password
        user.password = req.body.newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
