const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment =require('../models/comment');
const Like =require('../models/like');

//get all posts
router.get('/',async (req, res)=>{
    try {
        const posts = await Post.find({}).populate('comments');
        res.status(200).json(posts);

    }catch (err) {
        console.error(err);
        res.status(500).json({error:err});
    }
})


//add a post
router.post('/new', async (req, res)=>{
   
        const post = new Post({
            description: req.body.description,
            image: req.body.image,
          })
    try{
          const p= await post.save();  
          res.status(200).json(p);
    }catch (err) {
        res.status(500).json({error:err});
    }
   
})

//delete a post
router.delete('/delete/:id', async (req, res )=>{
    try {
        const post = await Post.findByIdAndDelete({_id:req.params.id});
        res.status(200).json(post);
    }catch(err) {
        res.status(500).json({error:err});
    }
    
})

//update a post
router.put('/update/:id',async (req, res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,{description:req.body.description,image:req.body.image},{new:true});
          res.status(200).json(post);
    }catch (err) {
        res.status(500).json({error:err});
    }
})


//add comment
router.post('/:id/comment',async (req, res)=>{
    try{
    const post= await Post.findById(req.params.id);
    const comment = new Comment({
         text : req.body.text
    })
    const c= await comment.save();
    post.comments.push(c._id);
    const updated = await post.save();
    res.status(200).json(updated);
    }catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})

//delete comment
router.delete('/:id/comment/:comment_id', async (req, res)=>{
    try {
        const post = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { comments: req.params.comment_id },
          },
          { new: true }
        );
        await Comment.findByIdAndDelete(req.params.comment_id);
    
       res.status(200).json(post);
    }catch(err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})

//update comment
router.put('/:id/comment/:comment_id', async (req, res)=>{
    try {
        const comment =await Comment.findByIdAndUpdate(req.params.comment_id,{text:req.body.text},{new :true});
       res.status(200).json(comment);
    }catch(err) {
        res.status(500).json({error:err});
    }
})

//add like
router.post('/:id/like',async (req, res)=>{
    try{
    const post= await Post.findById(req.params.id);
    const like = new Like({})
    const l= await like.save();
    post.likes.push(l._id);
    const updated = await post.save();
    res.status(200).json(updated);
    }catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})

//delete like
router.delete('/:id/like/:like_id', async (req, res)=>{
    try {
        const post = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { likes: req.params.like_id },
          },
          { new: true }
        );
        await Like.findByIdAndDelete(req.params.like_id);
    
       res.status(200).json(post);
    }catch(err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})


module.exports = router;