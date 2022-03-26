// const upload = require("../middlewares/upload");
// const Post = require("../models/post");
 

// const multipleUpload = async (req, res) => {
//   let post
//   try {
    
//     const hello= await upload(req, res);
//     console.log(hello)
//     if (req.files) {
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
// };
  
  
// module.exports = {
//   multipleUpload: multipleUpload
// };


