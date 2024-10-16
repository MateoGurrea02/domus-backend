const express = require('express');
const { createAgent, getAgents, getAgentById } = require('../controllers/agentController');
const { auth } = require('../authenticators/auth')
const router = express.Router();

router.post('/agents', auth, createAgent);
router.get('/agents', getAgents);
router.get('/agents/:id', getAgentById);

module.exports = router;
