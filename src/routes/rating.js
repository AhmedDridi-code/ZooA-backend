const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Rating = require('../models/rating');

async function calculMoy(req,res){
    const ratings = await Rating.find({userRated:req.body.userRated})
    const user = await User.findById(req.body.userRated);
    let sum = 0;
    ratings.forEach((el)=>{
        sum+=el.value;
    })
    let moy = sum/ratings.length;
    user.totalRatings=moy;
    console.log(user)
    await user.save()
}


router.get('/',async(req,res)=>{
    try{
        const ratings = await Rating.find({})
        console.log(ratings)
        
        res.status(200).json(ratings);
    }catch(e){
        console.log(e)
        res.status(500).json(e);
    }
})
router.post('/',async (req,res)=>{
    try{
        //get all ratings of the user rated
        
        //user already rated
        const userAR = await Rating.find({user:req.body.user, userRated:req.body.userRated })
        console.log(userAR)
        if(userAR.length>0){
            let rate = userAR[0]
            rate.value = req.body.value;
            await rate.save();
            calculMoy(req,res)
            console.log(rate);
            return res.status(200).json(rate);
        }else{
            const rating = await Rating.create(req.body);
            calculMoy(req,res)
            console.log(rating)
            return res.status(200).json(rating);
        }
    }catch(e){
        console.log(e)
        res.status(500).json(e);
    }
})



module.exports =router;