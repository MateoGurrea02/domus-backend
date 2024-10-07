const express = require('express');
const { createProperty, getProperties, getPropertyById } = require('../controllers/propertyController');
const router = express.Router();

router.post('/properties', createProperty);
router.get('/properties', getProperties);
router.get('/properties/:id', getPropertyById);

module.exports = router;
