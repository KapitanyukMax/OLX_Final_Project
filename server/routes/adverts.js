const express = require('express')
const router = express.Router()
const advertsController = require('../controllers/advertsController')

router.route('/')
    .get(advertsController.getAllAdverts)
    .post(advertsController.createAdvert)
    .put(advertsController.updateAdvert);

router.route('/:id')
    .get(advertsController.getAdvertById)
    .delete(advertsController.deleteAdvert);

router.route('/subcategory')
    .get(advertsController.getAdvertsBySubcategoryId);

router.route('/category')
    .get(advertsController.getAdvertsByCategoryId);

router.route('/user')
    .get(advertsController.getAdvertsByUserId);

module.exports = router;