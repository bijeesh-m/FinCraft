// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadDir = path.join(__dirname, "uploads"); 
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Configure storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(file);

//     cb(null, uploadDir); // Directory to store files
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
    
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// // Initialize multer with storage config
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
//   fileFilter: (req, file, cb) => {
//     console.log(file);
    
//     const fileTypes = /pdf|jpeg|jpg|png/;
//     const extname = fileTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = fileTypes.test(file.mimetype);

//     if (mimetype && extname) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF, JPEG, and PNG files are allowed"));
//     }
//   },
// });

// module.exports = upload;
