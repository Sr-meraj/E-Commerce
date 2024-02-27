import { Router } from 'express'
import { deleteProduct, getAllProducts, getProductById, newProduct, productUpdate } from '../controllers/product.controller.js'
import { verifyJWT } from '../middleweres/auth.middlewere.js'
import { upload } from '../middleweres/multer.middlewere.js'

const router = Router()

// all product get route with search query
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// secure routes
router.route('/create').post(
    verifyJWT,
    upload.fields([
        {
            name: "productImages",
            maxCount: 8,
        },
    ]),
    newProduct
);
    
router.route("/update/:id").put(
    verifyJWT,
    upload.fields([
        {
            name: "productImages",
            maxCount: 8,
        },
    ]),
    productUpdate
)
router.route('/delete/:id').delete(verifyJWT, deleteProduct)
    
export default router 

