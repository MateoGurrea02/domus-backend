const express = require('express');
const { createClient, getClients, getClientById } = require('../controllers/clientController');
const router = express.Router();

router.post('/clients', createClient);
router.get('/clients', getClients);
router.get('/clients/:id', getClientById);

module.exports = router;
