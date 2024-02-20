/**
 * Title: Ecommere server
 * description:
 * date: 2/20/2024
 * 
 */

// require('dotenv').config({path: '../env'})


import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/index.js';

const app = express();

dotenv.config({
    path:'./env'
})

app.use(express.json());


// Database Connection with MongoDB
connectDB()

// API creation
app.get('/', (req, res) => {
    res.send('Ecommerce Server running')
});



app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log('Server running on port '+ process.env.PORT);
    } else {
        console.log('Error : '+error)
    }
})