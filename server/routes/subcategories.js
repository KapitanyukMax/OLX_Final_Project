const express = require('express')
const router = express.Router()
const subcategoriesController = require('../controllers/subcategoryController')

router.route('/')
    .get(subcategoriesController.getAllSubcategories)
    .post(subcategoriesController.createSubCategories)
    .put(subcategoriesController.updateSubCategory);

router.route('/:id')
    .get(subcategoriesController.getSubCategoryById)
    .delete(subcategoriesController.deleteSubCategory);

router.route('/by-category/:categoryId')
    .get(subcategoriesController.getSubcategoriesByCategoryId);

module.exports = router;
