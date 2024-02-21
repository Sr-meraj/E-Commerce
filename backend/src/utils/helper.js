/**
 * title; helper modules
 */

const path = require('path');
const multer = require("multer");

// module scaffolding
const helper = {};


helper.storage = (location)=> multer.diskStorage({
    destination: location,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

module.exports = helper;


// const upload = multer({ storage: storage('./upload/images') });

// // Creating upload endpoint for images
// app.use('/images', express.static('upload/images'));

// app.post('/upload', upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${port}/images/${req.file.filename}`
//     });
// });

// app.post('/gallery', upload.array('gallery'), (req, res) => {
//     res.json({
//         success: 1,
//         image_urls: req.files.map(file => `http://localhost:${port}/images/${file.filename}`)
//     });
// });
