const express = require('express')
const router = express.Router()
const advertReportsController = require('../controllers/advertReportsController')

router.route('/')
    .get(advertReportsController.getAllAdvertReports)
    .post(advertReportsController.createAdvertReport)
    
router.route('/userId')
    .get(advertReportsController.getAdvertReportByUserId);

router.route('/:id')
    .get(advertReportsController.getAdvertReportById)
    .delete(advertReportsController.deleteAdvertReport);


module.exports = router;