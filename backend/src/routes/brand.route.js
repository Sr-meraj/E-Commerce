import { Router } from 'express';
import { createBrand } from '../controllers/brand.controller.js';
import { adminCheck, verifyJWT } from '../middleweres/auth.middlewere.js';
import { upload } from '../middleweres/multer.middlewere.js';

const router = Router()

router.route('/').get();
router.route('/:brandId').get();


// secure routes
router.route('/create').post(
    verifyJWT, upload.single('brandImage'), createBrand
);

router.route('/update/:brandId').put(
    verifyJWT, adminCheck,  
);
router.route('/delete/:brandId').delete(
    verifyJWT, adminCheck,  
);



export default router 

