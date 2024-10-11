const express = require('express')
const router = express.Router()
const chatsController = require('../controllers/chatsController');

router.route('/')
    .post(chatsController.createChat)
    .put(chatsController.updateChat);

router.route('/:id')
     .get(chatsController.getChatById)
     .delete(chatsController.deleteChat);


router.route('/by-user/seller/:userId')
    .get(chatsController.getChatsByUserIdAsSeller);

router.route('/by-user/buyer/:userId')
    .get(chatsController.getChatsByUserIdAsBuyer);

module.exports = router;