const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
  const headerAuth = req.headers['authorization'];
  if (!headerAuth) {
    return res.status('401').json({ 
      status: 401,
      error: 'Falta el Token' });
  }
  try{
    const payload = jwt.verify(headerAuth, process.env.JWT_SECRET);
    const email = payload.email;
    next()
  }
  catch (error){
    let message;
    switch (error.name) {
        case 'JsonWebTokenError':
            message = 'Error in the JWT';
            break;
        default:
            message = error.message;
            break;
    }
    return res.status(401).json({ 
        status: 401,
        error: message });
  }
}

module.exports = { auth }