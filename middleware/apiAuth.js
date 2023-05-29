const dotenv = require('dotenv').config();
function checkOrigin(req, res, next) {
    const allowedOrigins = [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    } else {
        return res.status(403).json({ error: 'Forbidden' });
    }

    next();
}



module.exports = checkOrigin;
