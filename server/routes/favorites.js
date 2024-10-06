const express = require('express')
const router = express.Router()
const favoritesController = require('../controllers/favoritesControlled')

router.route('/userId')
    .get(favoritesController.getAllAdvertsFromFavorites);

router.route('/add')
    .get(favoritesController.addAdvertToFavorites);

router.route('/remove')
    .get(favoritesController.removeAdvertFromFavorites);

module.exports = router;