
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const multer = require("multer");
const path = require('path');
const userController= require('../controllers/userController')
/* const {storage}= require('../utils/multerSingleFileConfig'); */
const mimeTypes ={
    "image/png":"png",
    "image/jpeg":"jpeg",
    "image/jpg":"jpg"
}
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = mimeTypes[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid){
            error=null;
        }        
        cb(error,"./src/images");
    },
    filename:(req,file,cb)=>{
        const name = file.originalname.toLocaleLowerCase().split(' ').join("-");
        const ext = mimeTypes[file.mimetype];
        cb(null,name+"-"+Date.now()+"."+ext);
    }
})
// get user by name
router.get("/search",async(req, res) => {
    try{
        const name = req.query.name;
        console.log(name);
        const user = await User.find({ $or: [{ fname: new RegExp(name,'i') }, { lname: new RegExp(name,'i') }] });
        
        res.status(200).json({user:user});
    }catch(err){
        console.log(err);
        res.status(500).json({err})
    }
})

router.get("/:id",async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({user:user});
    }catch(err){
        console.log(err);
        res.status(500).json({err})
    }
})

router.post("/signup",(req,res)=>{
    bcrypt.hash(req.body.password,10)
.then(hash=>{
        const user = new User({
            email : req.body.email,
            password : hash,
            role : req.body.role ?? 'user',
            fname:req.body.fname,
            lname:req.body.lname,
            birthdate:req.body.birthdate,
            phone:req.body.phone,
            adresse:req.body.adresse,
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
    let fetchedUser;
    console.log("body: "+req.body);
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            console.log("User not found")
            return res.status(404).json({message:"User not found"})
        }
        console.log("user found: "+user)
        fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password)
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({message:"Unauthorised!"})
        }
        const token = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id,role:fetchedUser.role}, "secret_this_should_be_longer",{expiresIn:"1h"})
        return res.status(200).json({token:token, expiresIn:3600, userId:fetchedUser._id,role:fetchedUser.role});
    })
    .catch(err=>{
        console.log(err);
        return res.status(401).json({message:"problem in bycript"})
    })
})

router.put("/:id",multer({storage:storage}).single("image"),async(req, res) => {
    try{
        let user = req.body;
        let imagePath="";
        const url = req.protocol+"://"+req.get("host");
        if(req.file){
            imagePath=url+"/images/"+req.file.filename;
            console.log("added image");
            user={...req.body.user,image:imagePath}
        }
        console.log(imagePath);
        console.log(user)
         const result = await User.findByIdAndUpdate(req.params.id,user,{new: true});
        console.log(result);
        res.status(200).json({user:result});
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})



router.post("/googleAuth", (req, res)=>{
    User.findOne({email:req.body.email}).then((user)=>{
        if(!user){
            const user = new User({
                email : req.body.email,
                fname:req.body.fname,
                lname:req.body.lname,
                image:req.body.image,
            })
            user.save().then(result=>{
                console.log(result);
                return res.status(200).json({message:"User created",user: result})
            }).catch(err=>{
                console.log(err);
                return res.status(500).json({error:err});
            })
        }else{
            return res.status(200).json({message:"authentification succeed",user:user});
        }

    }).catch(err=>{
        console.log(err);
        return res.status(500).json({error:err});
    })
})


router.get("",userController.findAllUsers);
router.delete("/deleteuser/:id", userController.deleteUser)
router.patch("/updateuser/:id", userController.updateUser)
router.get("/:id", userController.findUserById)
module.exports =router;