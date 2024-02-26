import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, subCategories, updateCategory } from '../controllers/category.controller.js';
import { verifyJWT } from '../middleweres/auth.middlewere.js';

const router = Router()

router.route('/').get(getAllCategories);

router.route('/:categoryId/subcategories').get(subCategories);
// secure routes
router.route('/create').post(
    verifyJWT, createCategory
);
router.route('/update/:categoryId').put(
    verifyJWT,  updateCategory
);
router.route('/delete/:categoryId').delete(
    verifyJWT,  deleteCategory
);



export default router 

