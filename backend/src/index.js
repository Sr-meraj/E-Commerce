/**
 * Title: Ecommerce Server
 * Description: This file serves as the main entry point for the Ecommerce server application.
 * Date: 2/20/2024
 */

// require('dotenv').config({path: '../env'})


import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/index.js';

const port = process.env.PORT || 8000

dotenv.config({
    path: './env'
});



// Database Connection with MongoDB
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(` Server is running at port : ${port}`);
        })
    })
    .catch((error) => {
        console.log("DB connection failed ", error);
    });

// API creation
app.get('/', (req, res) => {
    res.send('Ecommerce Server running')
});
