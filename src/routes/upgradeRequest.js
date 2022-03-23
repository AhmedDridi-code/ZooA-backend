const express = require('express');
const router = express.Router();
const {upload} =require('../outils/fileStorageEngine')


const upgradeRequestController = require('../controllers/upgradeRequestController')

router.get('',upgradeRequestController.findAllUpgradeRequests)
router.post('/send/:id',upload.single('attachedFile'),upgradeRequestController.sendRequest)
router.get('/get/:id',upgradeRequestController.getUpgradeRequestById)
module.exports = router;