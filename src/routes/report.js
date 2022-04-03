const express = require('express');
const router = express.Router();
const reportController  =require('../controllers/reportsController')

router.get('' ,reportController.getAllReports)
router.post('/send/:id_sender/:id_post',reportController.sendReport)







module.exports = router;