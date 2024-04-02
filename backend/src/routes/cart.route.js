import { Router } from 'express'
import { addToCart } from '../controllers/cart.controller.js'

const router = Router()


router.route('/add-item').post(addToCart)



export default router 

