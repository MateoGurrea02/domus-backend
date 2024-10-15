const express = require('express');
const { createProperty, getProperties, getPropertyById, deleteProperty } = require('../controllers/propertyController');
const router = express.Router();

router.post('/properties', createProperty);
router.get('/properties', getProperties);
router.get('/properties/:id', getPropertyById);
router.delete('/properties/:id', deleteProperty);

module.exports = router;
