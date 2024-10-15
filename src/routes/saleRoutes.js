const express = require('express');
const { createSale, getSales, getSaleById } = require('../controllers/saleController');
const router = express.Router();

router.post('/sales', createSale);
router.get('/sales', getSales);
router.get('/sales/:id', getSaleById);

module.exports = router;
