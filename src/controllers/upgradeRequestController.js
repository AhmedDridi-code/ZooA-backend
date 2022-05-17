const UpgradeRequest = require('../models/upgradeRequest');
const { ObjectId } = require('mongodb');
const { checkUserExists, updateUser } = require('../controllers/userController')


module.exports.findAllUpgradeRequests = function (req, res) {
    UpgradeRequest.find()
        .populate("user")
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(404).json(error)
        })
}
module.exports.sendRequest = async function (req, res) {

    let user_id = req.params.id;
    //check if this userID is valid
    if (!ObjectId.isValid(user_id)) {
        return res.status(404).json({ error: "Invalid ID" })
    }

    //check if this user exists in our DB
    let user = await checkUserExists(req, res);
    //The user exists
    if (user) {
        UpgradeRequest.find({ user: user_id })
            .then(result => {
                //if the request has been already sent
                if (result.length > 0) {
                    return res.status(400).json({ error: 'Your request has been already sent' })
                }
                // if this is a new request
                else {
                    let request = new UpgradeRequest({
                        user: user_id,
                        date: Date.now(),
                        description: req.body.description,
                        upgradeTo: 'veterinary',
                        attachedFile: req.file ? req.file.filename : null,
                        isValidated: false
                    });
                    request.save()
                        .then(result => {
                            res.status(200).json(result)
                        })
                        .catch(error => {
                            res.status(400).json(error.message)
                        })
                }
            })
            .catch(error => { error.message })

    }
    //UserID not found 
    else {
        res.status(404).json("User not found")
    }
}
module.exports.getUpgradeRequestById = async function (req, res) {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" })
    }
    let request = await upgradeRequestById(req, res);
    if (request) {
        res.status(200).json(request)
    } else {
        res.status(401).json("Error")
    }

}
module.exports.validateRequest = async function (req, res) {
    updateUser(req, res);

}

module.exports.deleteUpgradeRequest = function (req, res) {
    let id = req.params.id
    UpgradeRequest.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json("Upgrade request deleted")
        })
        .catch(error => { res.status(401).json({ error: err }) })
}
function upgradeRequestById(req, res) {
    return UpgradeRequest.findById(req.params.id)
        .then(result => { return result })
        .catch(error => { return "Error occured" })
}
