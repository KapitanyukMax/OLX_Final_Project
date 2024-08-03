const express = require('express')
const router = express.Router()
const walletController = require('../controllers/walletController')

router.route('/')
    .post(walletController.createWallet)
    .put(walletController.updateWallet);

router.route('/userId')
    .get(walletController.getWalletByUserId);

router.route('/:id')
    .get(walletController.getWalletById)
    .delete(walletController.deleteWallet);

module.exports = router;