import { Router } from 'express'
import { newProduct } from '../controllers/product.controller.js'
import { adminCheck, verifyJWT } from '../middleweres/auth.middlewere.js'
import { upload } from '../middleweres/multer.middlewere.js'

const router = Router()

// secure routes
router.route('/create').post(verifyJWT, adminCheck,
    upload.fields([
        {
            name: "productImages",
            maxCount: 8,
        },
    ]), newProduct
)


export default router 

