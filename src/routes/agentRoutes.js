const express = require('express');
const { createAgent, getAgents, getAgentById } = require('../controllers/agentController');
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const router = express.Router();

router.post('/agents', auth, isAdmin, createAgent);
router.get('/agents', isAdmin, getAgents);
router.get('/agents/:id', getAgentById);

module.exports = router;
