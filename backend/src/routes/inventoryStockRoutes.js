const express = require('express');
const router = express.Router();
const InventoryStockController = require('../controllers/inventoryStockController');
const { auth } = require('../middleware/Auth');

router.post('/inventory', auth, InventoryStockController.createInventoryStock);
router.get('/inventory', auth, InventoryStockController.getAllInventoryStock);
router.put('/inventory/:stockNumber', auth, InventoryStockController.updateInventoryStock);
router.delete('/inventory/:stockNumber', auth, InventoryStockController.deleteInventoryStock);

module.exports = router;
