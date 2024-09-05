const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

router.post('/request-password-reset', resetPasswordController.requestPasswordReset);
router.post('/verify-reset-code', resetPasswordController.verifyResetCode);
router.post('/reset-password', resetPasswordController.resetPassword);
router.post('/re-send-reset-code',resetPasswordController.reSendResetCode );
module.exports = router;
