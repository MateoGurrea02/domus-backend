const express = require('express');
const { createClient, getClients, getClientById } = require('../controllers/clientController');
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')

router.post('/clients', isAgent, createClient);
router.get('/clients', getClients);
router.get('/clients/:id', getClientById);

module.exports = router;
