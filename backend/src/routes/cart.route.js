import { Router } from 'express'
import {
    createCart,
    deleteCart,
    deleteCartItem
} from '../controllers/cart.controller.js'
import { verifyJWT } from '../middleweres/auth.middlewere.js'

const router = Router()


router.route('/add').post(verifyJWT, createCart)
router.route('/delete/:cartId').post(verifyJWT, deleteCart)
router.route('/delete/:cartId/:productId').post(verifyJWT, deleteCartItem)



export default router 

