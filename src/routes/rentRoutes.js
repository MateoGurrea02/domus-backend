const express = require('express');
const { createRent, getRents, getRentById, getRentsByAgent, updateRent, deleteRent } = require('../controllers/rentController');
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')

router.post('/rents', isAgent, createRent);
router.get('/rents', getRents);
router.get('/rents/find/:id', getRentById);
router.get('/rents/agent', isAgent, getRentsByAgent)
router.put('/rents/:id', isAgent, updateRent)
router.delete('/rents/:id', isAgent, deleteRent)

module.exports = router;
