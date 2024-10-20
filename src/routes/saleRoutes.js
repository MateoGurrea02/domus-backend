const express = require('express');
const { createSale, getSales, getSaleById, getSalesByAgent, updateSale } = require('../controllers/saleController');
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')

router.post('/sales', isAgent, createSale);
router.get('/sales', getSales);
router.get('/sales/find/:id', getSaleById);
router.get('/sales/agent', isAgent, getSalesByAgent)
router.post('/sales/:id', isAgent, updateSale)

module.exports = router;
