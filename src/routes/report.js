const express = require('express');
const router = express.Router();
const reportController  =require('../controllers/reportsController')

router.get('' ,reportController.getAllReports)
router.post('/send/:id_sender/:id_post',reportController.sendReport)
router.get('/:id_report',reportController.findReportById)





module.exports = router;