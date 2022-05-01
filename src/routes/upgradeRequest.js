const express = require('express');
const router = express.Router();

const {upload} = require('../utils/multerSingleFileConfig')

/* const upgradeRequestController = require('../controllers/upgradeRequestController')

<<<<<<< .merge_file_OUxoXa
router.get('',upgradeRequestController.findAllUpgradeRequests)
//router.post('/send/:id',upload.single('attachedFile'),upgradeRequestController.sendRequest)
router.get('/get/:id',upgradeRequestController.getUpgradeRequestById)
router.post('/validate/:id',upgradeRequestController.validateRequest)
router.delete('/delete/:id',upgradeRequestController.deleteUpgradeRequest) */
=======
// router.get('',upgradeRequestController.findAllUpgradeRequests)
// router.post('/send/:id',upload.single('attachedFile'),upgradeRequestController.sendRequest)
// router.get('/get/:id',upgradeRequestController.getUpgradeRequestById)
// router.post('/validate/:id',upgradeRequestController.validateRequest)
// router.delete('/delete/:id',upgradeRequestController.deleteUpgradeRequest)
>>>>>>> .merge_file_zUzsDH
module.exports = router;