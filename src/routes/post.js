const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment =require('../models/comment');
const Like =require('../models/like');
const checkAuth = require("../middlewares/check-auth");
const multer = require("multer");

//get all posts
router.get('/', async (req, res)=>{
    try {
        const posts = await Post.find({}).populate('user comments likes');
        res.status(200).json(posts);

    }catch (err) {
        console.error(err);
        res.status(500).json({error:err});
    }
})

//get post by id 
router.get('/:id' ,checkAuth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
         .populate('user');
        res.status(200).json(post);
    }catch (err) {
        res.status(500).json({error:err});
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/images");
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
  });
const upload = multer({ storage });

//add a post (with image)
router.post('/',checkAuth,upload.array('images'), async (req, res)=>{ 
    let post;
    try {
        //const images = req.files;
        const images = req.files.map(file => {
            return req.protocol + "://" + req.get("host") + "/images/"+file.filename;
        })
        console.log(images)
        if (Array.isArray(images) && images.length > 0) {            
            post = new Post({
                description: req.body.description,
                images: images,
                user: req.dataAuth.userId,
                totalReports : 0
               
            })
            const p = await post.save();
            console.log("post added")
            res.status(200).json(p);
        } else {
            post = new Post({
                description: req.body.description,
                user: req.dataAuth.userId,
                totalReports : 0
            })
            const p = await post.save();
            console.log("post added without images")
            res.status(200).json(p);
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
    
})





//     let post
//   try {
//     if (req.files>0) {
//       console.log(req.files);
//       const imagesPath = req.files.map(file => {
//         return req.protocol + "://" + req.get("host") + "/images/" + file.filename;
//       })
//       post = new Post({
//         description: req.body.description,
//         image: imagesPath,
//         user: req.dataAuth.userId
//       })
//       const p = await post.save();
//       console.log("post added")
//       res.status(200).json(p);
//     } else {
//       post = new Post({
//         description: req.body.description,
//         user: req.dataAuth.userId
//       })
//     }
//   } 
//   catch (error) {
//     if (error.code === "LIMIT_UNEXPECTED_FILE") {
//       console.log(error)
//       return res.send("Too many files to upload.");
//     }
//     console.log(error)
//     return res.status(500).json(error);
//   }
//}

//delete a post
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const post = await Post.findOne(
            {   
                _id: req.params.id, 
               // user: req.dataAuth.userId 
            }).then(post=>{
                post.remove();
                res.status(200).json(post);
            })
    } catch (err) {
        res.status(500).json({ error: err });
    }

})

//update a post
router.put('/:id',checkAuth, async (req, res)=>{
    try{
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            //req.dataAuth.userId,
            {
                description:req.body.description
            },
            {
                new:true
            }
            );
          res.status(200).json(post);
    }catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})


//add comment
router.post('/:id/comment',checkAuth, async (req, res)=>{
    try{
    const post= await Post.findById(req.params.id).populate('user comments')
    const comment = new Comment({
         text : req.body.text,
         post :req.params.id,
         user: req.dataAuth.userId
         
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
router.delete('/:id/comment/:comment_id',checkAuth, async (req, res)=>{
    try {
        const post = await Post.findByIdAndUpdate(
          req.params.id,
          //req.dataAuth.userId ,
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
router.put('/:id/comment/:comment_id',checkAuth, async (req, res)=>{
    try {
        const comment =await Comment.findByIdAndUpdate(
            req.params.comment_id,
            {
                text:req.body.text
            },
            {
                new :true
            });
       res.status(200).json(comment);
    }catch(err) {
        res.status(500).json({error:err});
    }
})

//get all post comments

// router.get('/:id/comments', checkAuth,async (req, res)=>{
//     try {
//         const post = await Post.findById(req.params.id).populate('user comments');
//        res.status(200).json(post.comments);
//     }catch(err) {
//         console.log(err);
//         res.status(500).json({error:err});
//     }
// })
//getAll comments
router.get('/:id/comments',checkAuth,async (req, res)=>{
    try {
        const comment = await Comment.find({post:req.params.id}).populate('user post');
       res.status(200).json(comment);
    }catch(err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})


 //get like by user
router.post('/:id/like', checkAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user likes')
        const likes = post.likes
        const like = likes.find(like => like.user == req.dataAuth.userId)
        let updatedpost;
        if (like) {
            updatedpost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likes: like._id }
                },
                { new: true }
            ).populate('user likes');
            await Like.findByIdAndDelete(like._id);
        }
        else {
            const like = new Like({
                user: req.dataAuth.userId
            })
            const l = await like.save();
            post.likes.push(l._id);
            updatedpost = await post.save();
        }
        res.status(200).json(updatedpost)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
})

//add like
// router.post('/:id/like',checkAuth,async (req, res)=>{
//     try{
//     const post= await Post.findById(req.params.id)
//     const like = new Like({
//         user: req.dataAuth.userId
//     })
//     const l= await like.save();
//     post.likes.push(l._id);
//     const updated = await post.save();
//     res.status(200).json(updated);
//     }catch (err) {
//         console.log(err);
//         res.status(500).json({error:err});
//     }
// })

//delete like
// router.delete('/:id/like/:like_id', async (req, res)=>{
//     try {
//         const post = await Post.findByIdAndUpdate(
//           req.params.id,
//           {
//             $pull: { likes: req.params.like_id },
//           },
//           { new: true }
//         );
//         await Like.findByIdAndDelete(req.params.like_id);
    
//        res.status(200).json(post);
//     }catch(err) {
//         console.log(err);
//         res.status(500).json({error:err});
//     }
// })

//getAllPostLikes
router.get('/:id/likes',checkAuth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
       res.status(200).json(post.likes);
    }catch(err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})





module.exports = router;