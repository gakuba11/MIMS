const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/salesController');
const { auth } = require('../middleware/Auth');

router.post('/sales', auth, SalesController.createSale);
router.get('/sales', auth, SalesController.getAllSales);
router.put('/sales/:salesNumber', auth, SalesController.updateSale);
router.delete('/sales/:salesNumber', auth, SalesController.deleteSale);

module.exports = router;
