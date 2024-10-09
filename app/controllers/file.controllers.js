//file.controllers.js
const { uploadMiddleware, uploadToFirebase } = require("../middleware/upload");

const uploadController = async (req, res)=>{
    try {
        console.log("file controller")
        await uploadMiddleware(req, res);
        if(!req.file){
            return res.status(400).send({
                message: "Not Found the upload file."
            });
        }

        console.log("Uploading file:", req.file);
        const fileUrl = await uploadToFirebase(req.file);
        res.status(200).send({
            message: "Upload file successfully.",
            fileUrl: fileUrl // Return the Firebase file URL
        });
    } catch (error) {
        res.status(500).send({ 
            message: "Could not upload the file: " + error
        });
    }
};

const displayAvatar = (req, res)=>{
    const filename = req.params.name;
    const publicUrl = `https://storage.googleapis.com/final-project-142d2.appspot.com/${filename}`;
    res.redirect(publicUrl); // Redirect to the Firebase URL
    // const directoryPath = __basedir + "/assets/";
    // console.log("a:" + directoryPath)
    // res.download(directoryPath + filename, filename, (err)=>{
    //     if(err){
    //         res.status(500).send({ message: "Could not display the file. " + err});
    //     }
    // });
};

exports.uploadSingleFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
  
      // Upload file to Firebase and get the download URL
      const downloadURL = await uploadFileToFirebase(req.file);
  
      res.status(200).json({ uploadFileName: downloadURL }); // Make sure you return the Firebase URL here
    } catch (error) {
      res.status(500).json({ message: "File upload failed", error: error.message });
    }
  };
  
module.exports = { uploadController, displayAvatar};