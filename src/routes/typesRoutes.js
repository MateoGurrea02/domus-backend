const express = require('express');
const { getPropertyTypes, getUserTypes } = require('../controllers/typesController');
const router = express.Router();
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.post('/propertyType', getPropertyTypes);
router.get('/userType', isAdminOrAgent, getUserTypes);

module.exports = router;
