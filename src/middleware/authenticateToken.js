const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader || !authHeader.includes('Bearer ')) {
        return res.status(401).json({ status: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ status: "Unauthorized" });

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(400).json({ error: err });
            req.payload = decoded.payload
            next();
        }
    )
}
