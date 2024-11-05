const express = require('express');
const { createAgent, getAgents, getAgentById, deleteAgent } = require('../controllers/agentController');
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')
const router = express.Router();

router.post('/agents', isAdmin, createAgent);
router.get('/agents', isAdminOrAgent, getAgents);
router.get('/agents/:id', isAdminOrAgent, getAgentById);
router.delete('/agents/:id', deleteAgent)

module.exports = router;
