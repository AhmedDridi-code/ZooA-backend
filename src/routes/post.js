const express = require('express');
const router = express.Router();
const Post = require('./post');

//get all posts
router.get('/posts',(req, res)=>{
const posts = Post.find({}, (err,data)=>{
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
    });
    res.status(200).json(posts);
})

//add a post
router.post('/post',(req, res)=>{
    const post = new Post({
        desc: req.body.description,
        img: req.body.image,
      })
      post.save(function (err, post) {
        if (err) { return next(err) }
        res.json(201, post)
      })
      res.status(200).json(post);
})

//delete a post
router.delete('/post/:id',(req, res)=>{
    const post = Post.findById({_id :req.body.})
})

//update a post
router.put('/:id',(req, res)=>{

})

//add comment
router.post('/:id/comment',(req, res)=>{

})

//delete comment
router.delete('/:id/comment/:id',(req, res)=>{

})

//update comment
router.put('/:id/comment/:id',(req, res)=>{

})

module.exports = router;