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

exports.authenticateCookieToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token)
        return res.status(401).redirect('login');

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(401).redirect('login');
            req.payload = decoded.payload
            next();
        }
    )
}


// exports.authenticateParamToken = (token) => {

//     if (!token)
//         throw new Error('Token is required');

//     jwt.verify(
//         token,
//         process.env.TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) throw new Error('Invalid token');
//             return decoded.payload;
//         }
//     )
// }


exports.authenticateParamToken = (token, callback) => {
    if (!token) {
        return callback(new Error('Token is required'), null);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return callback(new Error('Invalid token'), null);
        }
        return callback(null, decoded.payload);
    });
};
