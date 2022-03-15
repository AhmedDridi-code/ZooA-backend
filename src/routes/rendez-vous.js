const express = require('express')
const router = express.Router()

const User = require('../models/user')

//get all veterenaires
router.get('/veterinaires', (req,res)=>{
    User.find({role: 'veterenaire'}).then(resultat=>{
        res.status(200).send({veterenaires:resultat})
    }
    )
})