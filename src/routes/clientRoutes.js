const express = require('express');
const { createClient, getClients, getClientById } = require('../controllers/clientController');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin')
const { isAgent } = require('../middlewares/isAgent')
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.post('/clients', isAdminOrAgent, createClient);
router.get('/clients', isAdminOrAgent, getClients);
router.get('/clients/:id', getClientById);

module.exports = router;
