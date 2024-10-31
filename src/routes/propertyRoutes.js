const path = require('path');
const express = require('express');
const { createProperty, getProperties, getPropertyById, getPropertiesByAgent, getPropertiesByUser, deleteProperty, filterProperty, updateProperty } = require('../controllers/propertyController');
const router = express.Router();
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.post('/properties', isAdminOrAgent, createProperty);
router.post('/properties/filter', filterProperty)
router.get('/properties', getProperties);
router.get('/properties/find/:id', getPropertyById);
router.get('/properties/agent/', isAdminOrAgent, getPropertiesByAgent);
router.get('/properties/user/:id', getPropertiesByUser);
router.put('/properties/update/:id', isAdminOrAgent, updateProperty)
router.delete('/properties/:propertyId', isAdminOrAgent, deleteProperty);

module.exports = router;
