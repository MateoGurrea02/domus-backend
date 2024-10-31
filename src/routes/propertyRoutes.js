const path = require('path');
const express = require('express');
const { createProperty, getProperties, getPropertyById, getPropertiesByAgent, deleteProperty, filterProperty, updateProperty } = require('../controllers/propertyController');
const { uploadImage, getPropertyImages } = require('../controllers/imageController')
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')
const upload = require('../../libs/storage')

router.post('/properties', isAgent, createProperty);
router.post('/properties/filter', filterProperty)
router.get('/properties', getProperties);
router.get('/properties/find/:id', getPropertyById);
router.get('/properties/agent/', isAgent, getPropertiesByAgent);
router.put('/properties/update/:id', isAgent, updateProperty)
router.delete('/properties/:propertyId', isAgent, deleteProperty);

module.exports = router;
