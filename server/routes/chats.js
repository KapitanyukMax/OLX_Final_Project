const express = require('express')
const router = express.Router()
const chatsController = require('../controllers/chatsController')

router.route('/')
    .get(chatsController.getAllChats)
    .post(chatsController.createChat)
    .put(chatsController.updateChat);

router.route('/:id')
     .get(chatsController.getChatById)
     .delete(chatsController.deleteChat);

module.exports = router;