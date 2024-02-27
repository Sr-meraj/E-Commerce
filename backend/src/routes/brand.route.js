import { Router } from 'express';
import { createBrand, deleteBrand, getAllBrands, updateBrand } from '../controllers/brand.controller.js';
import { verifyJWT } from '../middleweres/auth.middlewere.js';
import { upload } from '../middleweres/multer.middlewere.js';

const router = Router()

router.route('/').get(getAllBrands);
// router.route('/:brandId').get();


// secure routes
router.route('/create').post(
    verifyJWT, upload.single('image'), createBrand
);

router.route('/update/:brandId').put(
    verifyJWT,  upload.single('image'), updateBrand
);
router.route('/delete/:brandId').delete(
    verifyJWT,  deleteBrand
);



export default router 

