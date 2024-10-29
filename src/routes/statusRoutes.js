const express = require('express');
const { getPropertyStatus, getRentStatus, getSaleStatus } = require('../controllers/statusController');
const router = express.Router();
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.get('/propertyStatus', getPropertyStatus);
router.get('/rentStatus', getRentStatus);
router.get('/saleStatus', getSaleStatus)

module.exports = router;
