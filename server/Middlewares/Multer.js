const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Documents", file,req);
        cb(null, "./uploads"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + "-" + file.originalname); // Add a timestamp to avoid duplicate file names
    },
});

const uploads = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

const singleFileUploadMiddleware = uploads.single("avatar"); // Adjust field name

// Accept multiple files from different fields
// const uploadMiddleware = uploads.fields([
//     { name: "documents-0", maxCount: 1 },
//     { name: "documents-1", maxCount: 1 },
//     { name: "documents-2", maxCount: 1 },
// ]);



module.exports = { uploads, singleFileUploadMiddleware };
