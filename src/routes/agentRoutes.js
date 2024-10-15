const express = require('express');
const { createAgent, getAgents, getAgentById } = require('../controllers/agentController');
const router = express.Router();

router.post('/agents', createAgent);
router.get('/agents', getAgents);
router.get('/agents/:id', getAgentById);

module.exports = router;
