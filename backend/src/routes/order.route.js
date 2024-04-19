import { Router } from "express";
import router from "./cart.route";
const router = Router();

router.route('/').get() 
router.route('/search').get()
router.route('/:orderId').get()

router.route('/add').post()
router.route('/status/item/:itemId').put()
router.route('/cancel/:orderId').delete()


export default router;