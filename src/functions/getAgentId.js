const Agent = require('../models/agent')
const jwt = require("jsonwebtoken");

const getAgentId = async (req) => {
    try {
        const headerAuth = req.headers['authorization']
        const payload = jwt.verify(headerAuth, process.env.JWT_SECRET);
        const userId = payload.id
        const agent = await Agent.findAll({
        where: {
            user: userId
        }
        })
        const agentId = agent[0].id
        return agentId
    } catch(error){
        return null
    }
}

module.exports = { getAgentId }