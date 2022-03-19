const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload')


const upgradeRequestController = require('../controllers/upgradeRequestController')

router.get('',upgradeRequestController.findAllUpgradeRequests)
//router.post('/send/:id',upload.single('attachedFile'),upgradeRequestController.sendRequest)
module.exports = router;