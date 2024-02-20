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
