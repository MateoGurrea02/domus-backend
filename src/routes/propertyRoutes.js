const express = require('express');
const { createProperty, getProperties, getPropertyById, getPropertiesByAgent, deleteProperty } = require('../controllers/propertyController');
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')

router.post('/properties', isAgent, createProperty);
router.get('/properties', getProperties);
router.get('/properties/find/:id', getPropertyById);
router.get('/properties/agent/', isAgent, getPropertiesByAgent);
router.delete('/properties/:propertyId', isAgent, deleteProperty);

module.exports = router;
