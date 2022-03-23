const multer =require('multer')
const fileStorageEngine = multer.diskStorage({
  destination : (req,file, cb) =>{
    cb(null,'./uploads')
  }, 
  filename : (req,file,cb)=>{
    cb(null,Date.now() +"--" +file.originalname)
  }

})
module.exports.upload=multer({storage: fileStorageEngine})






// const multer = require("multer");
// const mimeTypes ={
//     "image/png":"png",
//     "image/jpeg":"jpeg",
//     "image/jpg":"jpg"
// }
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         const isValid = mimeTypes[file.mimetype];
//         let error = new Error("Invalid mime type");
//         if (isValid){
//             error=null;
//         }        
//         cb(error,"images");
//     },
//     filename:(req,file,cb)=>{
//         const name = file.originalname.toLocaleLowerCase().split(' ').join("-");
//         const ext = mimeTypes[file.mimetype];
//         cb(null,name+"-"+Date.now()+"."+ext);
//     }
// })
// module.exports=storage;