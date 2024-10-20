const express = require('express');
const { createClient, getClients, getClientById } = require('../controllers/clientController');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin')
const { isAgent } = require('../middlewares/isAgent')

router.post('/clients', isAgent, createClient);
router.get('/clients', isAdmin, getClients);
router.get('/clients/:id', getClientById);

module.exports = router;
