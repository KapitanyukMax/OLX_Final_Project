const express = require('express')
const router = express.Router()
const advertsController = require('../controllers/advertsController')

router.route('/')
    .get(advertsController.getAllAdverts)
    .post(advertsController.createAdvert)
    .put(advertsController.updateAdvert);

router.route('/subcategoryId')
    .get(advertsController.getAdvertsBySubcategoryId);

router.route('/categoryId')
    .get(advertsController.getAdvertsByCategoryId);

router.route('/userId')
    .get(advertsController.getAdvertsByUserId);

router.route('/:id')
    .get(advertsController.getAdvertById)
    .delete(advertsController.deleteAdvert);


module.exports = router;