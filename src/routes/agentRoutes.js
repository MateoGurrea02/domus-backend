const express = require('express');
const { createAgent, getAgents, getAgentById, deleteAgent } = require('../controllers/agentController');
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const router = express.Router();

router.post('/agents', isAdmin, createAgent);
router.get('/agents', isAdmin, getAgents);
router.get('/agents/:id', getAgentById);
router.delete('/agents/:id', deleteAgent)

module.exports = router;
