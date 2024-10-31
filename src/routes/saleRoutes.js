const express = require('express');
const { createSale, getSales, getSaleById, getSalesByAgent, updateSale, deleteSale } = require('../controllers/saleController');
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.post('/sales', isAdminOrAgent, createSale);
router.get('/sales', getSales);
router.get('/sales/find/:id', getSaleById);
router.get('/sales/agent', isAdminOrAgent, getSalesByAgent)
router.put('/sales/:id', isAdminOrAgent, updateSale)
router.delete('/sales/:id', isAdminOrAgent, deleteSale)

module.exports = router;
