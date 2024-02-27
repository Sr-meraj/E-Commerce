import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// routes import 
import brandRouter from './routes/brand.route.js';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';

// routes declaration

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/brands', brandRouter)



export { app };

