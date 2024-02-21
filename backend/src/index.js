/**
 * Title: Ecommerce Server
 * Description: This file serves as the main entry point for the Ecommerce server application.
 * Date: 2/20/2024
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
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(` Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
    console.log("DB connection failed ", error);
})

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