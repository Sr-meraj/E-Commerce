import { Router } from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';
import { adminCheck, verifyJWT } from '../middleweres/auth.middlewere.js';

const router = Router()

router.route('/').get(getAllCategories);
router.route('/:categoryId').get(getCategoryById);

// secure routes
router.route('/').post(
    verifyJWT, adminCheck, createCategory
);
router.route('/:categoryId').put(
    verifyJWT, adminCheck, updateCategory
);





export default router 

