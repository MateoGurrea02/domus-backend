const jwt = require("jsonwebtoken");

const getUserType = async (req) => {
    try {
        const headerAuth = req.headers['authorization']
        const payload = jwt.verify(headerAuth, process.env.JWT_SECRET);
        const userType = payload.type
        return userType
    } catch(error){
        return null
    }
}

module.exports = { getUserType }