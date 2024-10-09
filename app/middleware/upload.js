//upload.js
const multer = require("multer")
const util = require("util")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __basedir + "/assets/");
    },
    filename: (req, file, cb)=>{
        const extArray = file.mimetype.split("/");
        const extension = extArray[extArray.length-1];
        const newFilename = "Fileupload-"+Date.now()+"."+extension;
        cb(null, newFilename);
    }
});
const uploadFile = multer({ storage: storage}).single("singlefile");
//promisify => async-await
const uploadMiddleware = util.promisify(uploadFile);
module.exports = uploadMiddleware;