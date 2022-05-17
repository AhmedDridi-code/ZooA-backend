const express = require('express')
const router = express.Router()
const appointment = require('../models/appointment')
const Appointment = require('../models/appointment')
const user = require('../models/user')
const checkAuth = require('../middlewares/check-auth')
const User = require('../models/user')

//affichage d'un rendez vous d'un veterinaire (par id)
router.get('/:id', async (req, res) => {
    //recupérer le veterenaire
    veterenary = User.findOne({ _id: req.params.id })
    //recupérer les rendez vous de  veterenaire
    let appointment = await Appointment.find({ veterenaryId: veterenary._id }).populate("veterinary user")
    res.status(200).send(appointment)
})

//valider le rendez vous
router.put('/:id', async (req, res) => {
    try {


        let appointment = await Appointment.findOneAndUpdate({ _id: req.params.id },
            { status: req.body.status = true }, { new: true })
        res.status(200).json({ message: "updated", appointment: appointment })
    } catch (err) {
        res.status(500).json({ error: err });
    }


})
//check user  appointments
router.get('/myappointments/:id', async (req, res)=>{
    try{

        appointments = await Appointment.find({}).populate("veterinary")
        myappointments = appointments.filter(appointments => {return  appointments.user == req.params.id})
       
        res.status(200).send(myappointments)
    }catch(err){

   
        res.status(404).json({error:err})
    }
    
    
})

//prendre un rendez vous avec un veterinaire
router.post('/', checkAuth,  async (req, res) => {
try{
    let appointment = await new Appointment({
        date: req.body.date,
    })
    appointment.user = req.dataAuth.userId
    appointment.veterinary = req.body.veterinaire
    appointment.description = req.body.description
    appointment.save()

    res.status(200).send(appointment)
}catch(err){
    console.log(err);
    res.status(500).send({error:err})
    
}
    

})

//delete un rendez vous 
router.delete('/:id', async (req, res) => {
    Appointment.findOneAndDelete({ _id: req.params.id })
})



module.exports = router
