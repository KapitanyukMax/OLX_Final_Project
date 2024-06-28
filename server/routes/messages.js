const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

router.route('/')
    .get(messageController.getAllMessages)
    .post(messageController.createMessage)
    .put(messageController.updateMessage);

router.route('/:id')
    .get(messageController.getMessageById)
    .delete(messageController.deleteMessage);

module.exports = router;