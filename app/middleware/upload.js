//upload.js
const admin = require("firebase-admin");
const multer = require("multer");
const path = require("path");
const util = require("util");
const serviceAccount = require("../final-project-142d2-firebase-adminsdk-9bw96-0693c9e497.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "final-project-142d2.appspot.com" // Replace with your Firebase project bucket
});

const bucket = admin.storage().bucket();

// Multer configuration
const storage = multer.memoryStorage(); // Store the file in memory
const uploadFile = multer({ storage: storage }).single("singlefile");

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, __basedir + "/assets/");
//     },
//     filename: (req, file, cb)=>{
//         const extArray = file.mimetype.split("/");
//         const extension = extArray[extArray.length-1];
//         const newFilename = "Fileupload-"+Date.now()+"."+extension;
//         cb(null, newFilename);
//     }
// });
// const uploadFile = multer({ storage: storage}).single("singlefile");

//promisify => async-await
const uploadMiddleware = util.promisify(uploadFile);

// Upload to Firebase function
const uploadToFirebase = async (file) => {
    const fileName = `Fileupload-${Date.now()}${path.extname(file.originalname)}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', (error) => reject(error));
        blobStream.on('finish', async () => {
            // Generate URL for accessing the file
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });
        blobStream.end(file.buffer);
    });
};

module.exports = { uploadMiddleware, uploadToFirebase };