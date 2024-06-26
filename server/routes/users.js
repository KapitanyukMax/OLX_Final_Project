const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .put(usersController.updateUser);

router.route('/:id')
    .get(usersController.getUserById)
    .delete(usersController.deleteUser);

module.exports = router;
