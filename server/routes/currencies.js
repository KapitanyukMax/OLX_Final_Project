const express = require('express')
const router = express.Router()
const currenciesController = require('../controllers/currenciesController')

router.route('/')
    .get(currenciesController.getAllCurrencies)
    .post(currenciesController.createCurrency)
    .put(currenciesController.updateCurrency);

router.route('/code')
    .get(currenciesController.getCurrencyByCode);


router.route('/abbr')
    .get(currenciesController.getCurrencyByAbbr);

router.route('/:id')
    .get(currenciesController.getCurrencyById)
    .delete(currenciesController.deleteCurrency);

module.exports = router;
