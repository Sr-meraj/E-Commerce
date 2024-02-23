import { Router } from 'express'
import { loginUser, logout, refreshAccessToken, registerUser } from '../controllers/user.controller.js'
import { verifyJWT } from '../middleweres/auth.middlewere.js'
import { upload } from '../middleweres/multer.middlewere.js'

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]), registerUser
)

router.route('/login').post(loginUser)

// secure routes
router.route('/logout').post(verifyJWT, logout)
router.route('/refresh-token').post(refreshAccessToken)

export default router 

