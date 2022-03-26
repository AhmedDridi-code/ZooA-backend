// const path = require('path');
// const multer = require('multer');
// const util = require("util");

// var storage = multer.diskStorage({

//     destination: function(req , file , cb) {
//         cb(null,'src/images/');
//     },
//     filename :function (req , file , cb) {
//         let ext = path.extname(file.originalname);
//         cb(null, Date.now()+ ext);
//     }
// })

// var upload = {

//     storage: storage,
//     fileFilter : function(req,file,callback) {
//         if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')
//         {
//             console.log(file.mimetype);
//             callback(null,true);
//         }
//         else 
//         { 
//             console.log(file.mimetype);

//             console.log('supported extentions is jpg,png,jpeg');
//         }
        
//             callback(null,false);
        
//     },
//     limits :{
//         fileSize : 1024 * 1024 * 2 
//     }
// }

// module.exports =upload;


// const util = require("util");
// const path = require("path");
// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.join(`${__dirname}../../images`));
//   },
//   filename: (req, file, callback) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
//       return callback(message, null);
//     }

//     var filename = `${Date.now()}${file.originalname}`;
//     callback(null, filename);
//   }
// });

// var uploadFiles = multer({ storage: storage }).array("images", 10);
// var uploadFilesMiddleware = util.promisify(uploadFiles);
// module.exports = uploadFilesMiddleware;


// const multer = require("multer");


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'src/images/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

