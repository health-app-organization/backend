function generateOTP(length) {
    // Generate a random 6-digit OTP
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
    }

    return otp;
}

module.exports = { generateOTP };