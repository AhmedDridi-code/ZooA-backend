const express = require('express')
const router = express.Router()
const User = require('../models/user')
//add veterenaire
router.post('/', (req,res) =>{
    let veterenaire = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        birthdate: req.body.birthdate,
        phone:req.body.phone,
        role: req.body.role,
        email: req.body.email, 
        username: req.body.username ,
        image: req.body.image
    })
    try{
        
        veterenaire.save().then(resultat=>{
            res.status(200).send(resultat)
        })
        
    }catch(err){
        console.log(err);
    }
})
//pour afficher tous les veterinaires
router.get('/', (req,res)=>{
    veterinaires= User.find({role:"veterinary"}).then(resultat=>{
        res.send(resultat)
    })
})
//get veterinaire by id
router.get('/:id',(req,res)=>{
    veterinaire = User.find({_id:req.params.id}).then(resultat=>{
        res.send(resultat)
        // .catch(err=>{
        //     res.status(404).send({memssage:"veterinaire does not exist"})
        //     console.log(err)
        // })
    })
})
//delete by id 
router.delete('/:id',async (req,res)=>{
    await User.findByIdAndDelete(req.params.id).then({
        message:"deleted successfully"
    })
})



module.exports = router