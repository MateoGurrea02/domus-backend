const express = require('express');
const { createRent, getRents, getRentById } = require('../controllers/rentController');
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')

router.post('/rents', isAgent, createRent);
router.get('/rents', getRents);
router.get('/rents/:id', getRentById);

module.exports = router;
