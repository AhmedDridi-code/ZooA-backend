const express = require('express');
const router = express.Router();

//get all posts
router.get('/',(req, res)=>{

})

//add a post
router.post('/',(req, res)=>{

})

//delete a post
router.delete('/:id',(req, res)=>{

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