const express = require('express');
const { createClient, getClients, getClientById, updateClient, deleteClient } = require('../controllers/clientController');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin')
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.post('/clients', isAdminOrAgent, createClient);
router.put('/clients/update', isAdmin, updateClient);
router.get('/clients', isAdminOrAgent, getClients);
router.get('/clients/:id', getClientById);
router.delete('/clients/:id', isAdmin, deleteClient)

module.exports = router;
