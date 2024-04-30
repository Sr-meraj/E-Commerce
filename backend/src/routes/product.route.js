import { Router } from 'express'
import { createProduct, deleteProduct, getAllProducts, getProduct, getTotalProducts, productsBasedOnCategory, productUpdate } from '../controllers/product.controller.js'
import { adminCheck, verifyJWT } from '../middleweres/auth.middlewere.js'
import { upload } from '../middleweres/multer.middlewere.js'

const router = Router()

// all product get route with search query
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.get("/total", getTotalProducts);
router.get("/category/:categoryId", productsBasedOnCategory);

// secure routes
router.route('/create').post(
    verifyJWT,
    upload.fields([
        {
            name: "productImages",
            maxCount: 8,
        },
    ]),
    createProduct
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
router.route('/delete/:id').delete(verifyJWT, adminCheck, deleteProduct)
    
export default router 

