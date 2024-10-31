const express = require('express');
const { getPropertyTypes, getUserTypes } = require('../controllers/typesController');
const router = express.Router();
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.get('/propertyType', getPropertyTypes);
router.get('/userType', getUserTypes);

module.exports = router;
