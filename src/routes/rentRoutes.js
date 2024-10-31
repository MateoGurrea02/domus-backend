const express = require('express');
const { createRent, getRents, getRentById, getRentsByAgent, updateRent, deleteRent } = require('../controllers/rentController');
const router = express.Router();
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.post('/rents', isAdminOrAgent, createRent);
router.get('/rents', getRents);
router.get('/rents/find/:id', getRentById);
router.get('/rents/agent', isAdminOrAgent, getRentsByAgent)
router.put('/rents/:id', isAdminOrAgent, updateRent)
router.delete('/rents/:id', isAdminOrAgent, deleteRent)

module.exports = router;
