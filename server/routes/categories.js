const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categoriesController')

router.route('/')
    .get(categoriesController.getAllCategories)
    .post(categoriesController.createCategory)
    .put(categoriesController.updateCategory);

router.route('/:id')
    .get(categoriesController.getCategoryById)
    .delete(categoriesController.deleteCategory);

module.exports = router;
