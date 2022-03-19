const upload = require("../middlewares/upload");
const Post = require("../models/post");

const multipleUpload = async (req, res) => {
    try {
      await upload(req, res);
      const imagesPath= req.files.map(file =>
        {
            return req.protocol+"://"+req.get("host")+"/images/"+file.filename;
        })
      if (req.files.length <= 0) {
        const post = new Post({
            description:req.body.description,
            user : req.body.user
        })
      }
     
        const post = new Post({
            description:req.body.description,
            image :imagesPath,
            user : req.body.user
        })
         const p = await post.save();
         res.status(200).json(p);

    } catch (error) {  
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
      return res.status(500).json(error);
    }
  };
  
  
module.exports = {
  multipleUpload: multipleUpload
};


