/**
 * Title: Ecommere server
 * description:
 * date: 2/20/2024
 * 
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { storage } = require('./utility/helper');

dotenv.config()
app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(`mongodb+srv://marajmia2626:${process.env.MONGOOSE_PASS}@cluster0.hiwshs9.mongodb.net/`);

const upload = multer({ storage: storage('./upload/images') });

// API creation
app.get('/', (req, res) => {
    res.send('Ecommerce Server running')
});

app.get('/api/jokes', (req, res) => {
    const jokes = [{title:'Mimjim Wedding Pic & video'}, {title:'Mimjim Wedding Pic & video'}, {title:'Mimjim Wedding Pic & video'}];
    res.send(jokes);
});

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

app.post('/gallery', upload.array('gallery'), (req, res) => {
    res.json({
        success: 1,
        image_urls: req.files.map(file => `http://localhost:${port}/images/${file.filename}`)
    });
});



app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log('Server running on port '+ process.env.PORT);
    } else {
        console.log('Error : '+error)
    }
})