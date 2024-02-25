import { Router } from 'express'
import { getAllProducts, newProduct } from '../controllers/product.controller.js'
import { adminCheck, verifyJWT } from '../middleweres/auth.middlewere.js'
import { upload } from '../middleweres/multer.middlewere.js'

const router = Router()

// secure routes
router.route('/create').post(
    verifyJWT,
    adminCheck,
    upload.fields([
        {
            name: "productImages",
            maxCount: 8,
        },
    ]),
    newProduct
);

// all product get route with search query
router.get("/", getAllProducts);


export default router 

