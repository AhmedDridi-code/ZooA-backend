const express = require('express')
const router = express.Router()
const appointment = require('../models/appointment')
const Appointment = require('../models/appointment')
const user = require('../models/user')

const User = require('../models/user')

//affichage d'un rendez vous d'un veterinaire (par id)
router.get('/:id',async (req,res)=>{
    //recupérer le veterenaire
    veterenary = User.findOne({_id:req.params.id})
    //recupérer les rendez vous de  veterenaire
    let appointment = await  Appointment.find({veterenaryId: veterenary._id}).populate("veterinary user")
    res.status(200).send(appointment)
})

//valider le rendez vous
router.put('/:id',async (req,res)=>{
   let appointment = await Appointment.findOneAndUpdate({_id:req.params.id},
    {status:true})
    res.status(200).send({message:"updated"})


})

//prendre un rendez vous avec un veterinaire
router.post('/:id', async(req,res)=>{
    
    let appointment = await new Appointment({
        date: req.body.date,
    })
    appointment.user = req.body.userId
    appointment.veterinary = req.params.id
    appointment.save()

    res.status(200).send(appointment)

})

//delete un rendez vous 
router.delete('/:id', async(req,res)=>{
    Appointment.findOneAndDelete({_id: req.params.id})
})



module.exports = router
