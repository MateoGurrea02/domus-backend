const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function isAdmin(req, res, next) {
    const headerAuth = req.headers['authorization'];
    if (!headerAuth) {
        return res.status('401').json({ message: 'Token is missing!' });
    }
    try {
        const payload = jwt.verify(headerAuth, process.env.JWT_SECRET);
        const isAdmin = payload.user.type === 1;
        if(!isAdmin){
            return res.status('401').json({ message: 'You not authorized' });
        }
    } catch (error) {
        let message;
        switch (error.name) {
            case 'JsonWebTokenError':{
                message = 'Error in the JWT';
                break;
            }
            default:{
                message = 'Error';
                break;
            }
        }
        return res.status(401).json({ token, message});
    }
    return next();
}

module.exports = isAdmin;