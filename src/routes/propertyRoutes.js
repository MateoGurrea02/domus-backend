const express = require('express');
const { createProperty, getProperties, getPropertyById, deleteProperty } = require('../controllers/propertyController');
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')

router.post('/properties', isAgent, createProperty);
router.get('/properties', getProperties);
router.get('/properties/:id', getPropertyById);
router.delete('/properties/:id', isAgent, deleteProperty);

module.exports = router;
