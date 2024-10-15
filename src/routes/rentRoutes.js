const express = require('express');
const { createRent, getRents, getRentById } = require('../controllers/rentController');
const router = express.Router();

router.post('/rents', createRent);
router.get('/rents', getRents);
router.get('/rents/:id', getRentById);

module.exports = router;
