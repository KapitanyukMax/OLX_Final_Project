const express = require('express')
const router = express.Router()
const citiesController = require('../controllers/citiesController')

router.route('/')
    .post(citiesController.fetchCities)

module.exports = router;