const express = require('express');
const { createSale, getSales, getSaleById } = require('../controllers/saleController');
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')

router.post('/sales', isAgent, createSale);
router.get('/sales', getSales);
router.get('/sales/:id', getSaleById);

module.exports = router;
