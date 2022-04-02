const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')
const multer = require("multer");
const userController= require('../controllers/userController')

router.post("/signup",(req,res)=>{
    bcrypt.hash(req.body.password,10)
.then(hash=>{
        const user = new User({
            email : req.body.email,
            password : hash,
            fname:req.body.fname,
            lname:req.body.lname,
            birthdate:req.body.birthdate,
            phone:req.body.phone,
        })
        user.birthdate instanceof Date; // true

        user.save().then(result=>{
            console.log(user);
            res.status(200).json({message:"User created",result: result})
        }).catch(err=>{
            console.log(err);
            res.status(500).json({error:err});

        })
    })
    .catch(err=>{
        console.error(err);
    })
})

router.post("/login",(req,res)=>{
    let fetchedUSer;
    console.log("body: "+req.body);
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            console.log("User not found")
            return res.status(404).json({message:"User not found"})
        }
        console.log("user found: "+user)
        fetchedUSer=user;
        return bcrypt.compare(req.body.password,user.password)
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({message:"problem in bycript"})
        }
        const token = jwt.sign({email:fetchedUSer.email,userId:fetchedUSer._id , 
        role:fetchedUSer.role}, "secret_this_should_be_longer",{expiresIn:"5h"})
        res.status(200).json({token:token, expiresIn:3600, userId:fetchedUSer._id});
    })
    .catch(err=>{
        console.log(err);
        return res.status(401).json({message:"problem in bycript"})
    })
})
router.get("",userController.findAllUsers);
router.delete("/deleteuser/:id", userController.deleteUser)
router.patch("/updateuser/:id", userController.updateUser)
router.get("/:id", userController.findUserById)

module.exports =router;