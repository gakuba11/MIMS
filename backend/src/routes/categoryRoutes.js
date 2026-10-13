const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const { auth } = require('../middleware/Auth');

router.post('/categories', auth, CategoryController.createCategories);
router.get('/categories', auth, CategoryController.getAllCategories);
router.put('/categories/:id', auth, CategoryController.updateCategory);
router.delete('/categories/:id', auth, CategoryController.deleteCategory);

module.exports = router;